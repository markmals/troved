import Downpour from "downpour";
import { execa } from "execa";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import type { FFmpegOptions, TranscodeFileOptions, VideoInfo, WatchOptions } from "./types";

async function ffprobe({ input }: { input: string }): Promise<VideoInfo> {
    const { stdout, stderr } = await execa("ffprobe", [
        "-i",
        input,

        "-v",
        "quiet",
        "-hide_banner",
        "-print_format",
        "json",
        "-show_format",
        "-show_streams",
    ]);

    if (stderr) throw new Error(stderr);

    return JSON.parse(stdout);
}

async function ffmpeg(options: FFmpegOptions) {
    const tag = options.videoTag !== undefined ? ["-tag:v", options.videoTag] : [];

    const args = [
        "-i",
        options.input,

        "-metadata:s:a:0",
        `language=${options.audioLanguageCode}`,

        // '-metadata:s:a:0',
        // `title="${options.subtitleLanguageCode.toUpperCase()}"`,

        "-c:v",
        options.videoCodec,

        ...tag,

        "-crf",
        options.quality,

        "-c:a",
        options.audioCodec,

        "-b:a",
        options.audioBitrate,

        options.output,
    ];

    await execa("ffmpeg", args);
}

export namespace transcoder {
    const EXTS = [".mkv", ".mp4"];

    export async function transcodeFile({
        inputPath,
        outputPath,
        quality = 23,
        audioBitrate = "320k",
        forceHEVC = false,
    }: TranscodeFileOptions) {
        const info = await ffprobe({ input: inputPath });
        const video = info.streams.find(stream => stream.codec_type === "video")!;

        const shouldConvert = video.codec_name === "h264" && forceHEVC;
        const isHEVC = video.codec_name === "hevc";

        const videoCodec = shouldConvert ? "libx265" : "copy";
        const audioCodec = shouldConvert ? "eac3" : "copy";
        const videoTag = shouldConvert || isHEVC ? "hvc1" : undefined;

        // Create output folders from output file path if they don't exist
        await fs.mkdir(path.dirname(outputPath), { recursive: true });

        await ffmpeg({
            input: inputPath,
            output: outputPath,
            audioLanguageCode: "eng",
            // TODO: Automatically add subtitles if they exist with the same name
            // as the video in the same directory.
            // subtitleLanguageCode: 'eng',
            videoCodec,
            videoTag,
            quality: quality.toString(),
            audioCodec,
            audioBitrate,
        });

        // FIXME: Make sure this doesn't happen if there's an ffmpeg error
        await fs.unlink(inputPath);
    }

    function getOutputPath(inputPath: string, tvPath: string, moviesPath: string) {
        const ext = path.extname(inputPath);
        const basename = path.basename(inputPath, ext);
        const metadata = new Downpour(basename);
        return metadata.type === "tv"
            ? `${tvPath}/${metadata.title}/${metadata.basicPlexName}.mp4`
            : `${moviesPath}/${metadata.basicPlexName}.mp4`;
    }

    export function watch({ input, output, quality, audioBitrate, forceHEVC }: WatchOptions) {
        const watcher = fs.watch(input, { recursive: true });
        const abortController = new AbortController();

        async function start() {
            for await (const { eventType, filename } of watcher) {
                if (abortController.signal.aborted) break;

                if (!filename || eventType !== "rename") continue;

                const eventPath = path.join(input, filename);

                // Check if file exists and get stats
                const stats = await fs.stat(eventPath);

                // If is file and extension is mkv or mp4
                if (stats.isFile() && EXTS.includes(path.extname(eventPath))) {
                    await transcodeFile({
                        inputPath: eventPath,
                        outputPath: getOutputPath(eventPath, output.tv, output.movies),
                        quality,
                        audioBitrate,
                        forceHEVC,
                    });
                } else if (stats.isDirectory()) {
                    // TODO: Do this for an entire directory and all its children
                    // e.g. /Volumes/SSD/Television
                    console.log("Directory change:", eventPath);
                } else {
                    console.log("Ignoring file:", eventPath);
                }
            }
        }

        // Start watching in background
        start();

        return { unwatch: () => abortController.abort() };
    }
}
