import { shellOut } from "$api/lib/shell-out.ts";
import { basename, dirname, extname } from "@std/path";
import Downpour from "downpour";
import type { FFmpegOptions, TranscodeFileOptions, VideoInfo, WatchOptions } from "./types.ts";

async function ffprobe({ input }: { input: string }): Promise<VideoInfo> {
    const stdoutText = await shellOut("ffprobe", [
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
    return JSON.parse(stdoutText);
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

    const command = new Deno.Command("ffmpeg", {
        args,
        stdout: "piped",
        stderr: "piped",
    });

    const { stderr } = await command.output();

    const stderrText = new TextDecoder().decode(stderr);
    if (stderrText) throw new Error(stderrText);
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
        const video = info.streams.find((stream) => stream.codec_type === "video")!;

        const shouldConvert = video.codec_name === "h264" && forceHEVC;
        const isHEVC = video.codec_name === "hevc";

        const videoCodec = shouldConvert ? "libx265" : "copy";
        const audioCodec = shouldConvert ? "eac3" : "copy";
        const videoTag = shouldConvert || isHEVC ? "hvc1" : undefined;

        // Create output folders from output file path if they don't exist
        await Deno.mkdir(dirname(outputPath), { recursive: true });

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
        await Deno.remove(inputPath);
    }

    function getOutputPath(inputPath: string, tvPath: string, moviesPath: string) {
        const ext = extname(inputPath);
        const base = basename(inputPath, ext);
        const metadata = new Downpour(base);
        return metadata.type === "tv"
            ? `${tvPath}/${metadata.title}/${metadata.basicPlexName}.mp4`
            : `${moviesPath}/${metadata.basicPlexName}.mp4`;
    }

    export function watch({ input, output, quality, audioBitrate, forceHEVC }: WatchOptions) {
        const watcher = Deno.watchFs(input);
        const abortController = new AbortController();

        async function start() {
            for await (const { kind, paths } of watcher) {
                if (abortController.signal.aborted) break;
                if (kind !== "rename") continue;

                for (const path of paths) {
                    const eventPath = path;
                    if (!path) continue;

                    try {
                        // Check if file exists and get stats
                        const stats = await Deno.stat(eventPath);

                        // If is file and extension is mkv or mp4
                        if (stats.isFile && EXTS.includes(extname(eventPath))) {
                            await transcodeFile({
                                inputPath: eventPath,
                                outputPath: getOutputPath(eventPath, output.tv, output.movies),
                                quality,
                                audioBitrate,
                                forceHEVC,
                            });
                        } else if (stats.isDirectory) {
                            // TODO: Do this for an entire directory and all its children
                            // e.g. /Volumes/SSD/Television
                            console.log("Directory change:", eventPath);
                        } else {
                            console.log("Ignoring file:", eventPath);
                        }
                    } catch (error) {
                        // Handle case where file might be deleted before we can process it
                        console.error(`Error processing ${eventPath}:`, error);
                    }
                }
            }
        }

        // Start watching in background
        start();

        return { unwatch: () => abortController.abort() };
    }
}
