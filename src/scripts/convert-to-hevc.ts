import { Command } from "commander";
import ProgressBar from "progress";
import { copyFile, mkdtemp, readdir, rename, rm, stat } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { tmpdir } from "node:os";
import { ffmpeg, ffprobe } from "../server/lib/fast-forward";

async function moveFile(source: string, destination: string) {
    try {
        await rename(source, destination);
    } catch (error) {
        if (error instanceof Error && error.message.includes("EXDEV")) {
            // If rename fails due to cross-device error, use copy and remove
            await copyFile(source, destination);
            await rm(source);
        } else {
            throw error;
        }
    }
}

async function convertToHEVC(input: string) {
    const isDirectory = (await stat(input)).isDirectory();

    async function processFile(filePath: string) {
        const tempDir = await mkdtemp(join(tmpdir(), "hevc-"));
        const tempOutputPath = join(tempDir, `${basename(filePath, extname(filePath))}.mp4`);
        const finalOutputPath = join(
            dirname(filePath),
            `${basename(filePath, extname(filePath))}.mp4`,
        );

        // Use ffprobe to get video, audio and subtitle information
        const fileInfo = await ffprobe({ input: filePath });

        // Check if the video is already HEVC
        const videoStream = fileInfo.streams.find(stream => stream.codec_type === "video");
        const isHEVC = videoStream?.codec_name === "hevc";
        const hasHVC1Tag = videoStream?.codec_tag_string === "hvc1";

        // Case: already HEVC with hvc1 tag, may just need subtitles
        if (isHEVC && hasHVC1Tag) {
            console.log(`${filePath} is already HEVC with hvc1 tag. Skipping.`);
            return;
        }

        // Case: just needs hvc1 tag, may also need subtitles
        if (isHEVC && !hasHVC1Tag) {
            const { code, stderr } = await ffmpeg({
                input: [filePath],
                output: tempOutputPath,
                videoCodec: "copy",
                audioCodec: "copy",
                subtitleCodec: "mov_text",
                map: "0",
                tag: { v: "hvc1" },
                metadata: { "s:a:0": { language: "eng", title: "ENG" } },
                verbosity: "error",
            });

            if (code === 0) {
                await rm(filePath);
                await moveFile(tempOutputPath, finalOutputPath);
                console.log(`Applied hvc1 tag to ${filePath}`);
            } else {
                console.error(`Error applying hvc1 tag to ${filePath}: ${stderr}`);
                await rm(tempDir, { recursive: true });
                process.exit(1);
            }
            await rm(tempDir, { recursive: true });
            return;
        }

        // Case: not HEVC, proceed with full conversion

        // Determine audio codec and channel layout
        const audioStream = fileInfo.streams.find(stream => stream.codec_type === "audio");
        const currentAudioCodec = audioStream?.codec_name;
        const channelLayout = audioStream?.channel_layout;

        let audioCodec = "copy";
        let audioBitrate;
        if (currentAudioCodec !== "aac" && currentAudioCodec !== "eac3") {
            if (channelLayout === "stereo" || channelLayout === "mono") {
                audioCodec = "aac";
                audioBitrate = "192k";
            } else {
                audioCodec = "eac3";
                audioBitrate = "640k";
            }
        }

        // Determine subtitle handling
        const subtitleStreams = fileInfo.streams.filter(stream => stream.codec_type === "subtitle");
        let subtitleCodec: string | undefined = "mov_text";
        let extractSubtitles = false;

        const bitmapSubtitleFormats = ["dvdsub", "dvbsub", "pgssub", "xsub"];
        for (const subStream of subtitleStreams) {
            if (bitmapSubtitleFormats.includes(subStream.codec_name)) {
                extractSubtitles = true;
                break;
            }
        }

        if (extractSubtitles) {
            subtitleCodec = undefined;
        }

        const { code, stderr } = await ffmpeg({
            input: [filePath],
            output: tempOutputPath,
            videoCodec: "libx265",
            audioCodec,
            preset: "medium",
            crf: 23,
            audioBitrate,
            subtitleCodec,
            tag: { v: "hvc1" },
            metadata: { "s:a:0": { language: "eng", title: "ENG" } },
            verbosity: "error",
        });

        if (code !== 0) {
            console.error(`Error converting ${filePath}: ${stderr}`);
            await rm(tempDir, { recursive: true });
            process.exit(1);
        }

        if (extractSubtitles) {
            for (let i = 0; i < subtitleStreams.length; i++) {
                const subStream = subtitleStreams[i];
                const subExt = subStream.codec_name === "subrip" ? "srt" : subStream.codec_name;
                const subtitleOutputPath = join(
                    dirname(finalOutputPath),
                    `${basename(finalOutputPath, ".mp4")}_${i}.${subExt}`,
                );
                const { code, stderr } = await ffmpeg({
                    input: [filePath],
                    output: subtitleOutputPath,
                    map: `0:s:${i}`,
                    verbosity: "error",
                });

                if (code !== 0) {
                    console.error(`Error extracting subtitle: ${stderr}`);
                    await rm(tempDir, { recursive: true });
                    process.exit(1);
                }
            }
        }

        await rm(filePath);
        await moveFile(tempOutputPath, finalOutputPath);
        console.log(`Successfully converted ${filePath} to HEVC`);
        await rm(tempDir, { recursive: true });
    }

    if (isDirectory) {
        const files = [];
        const entries = await readdir(input, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isFile()) {
                const ext = extname(entry.name).toLowerCase();
                if ([".mp4", ".mkv", ".avi", ".mov"].includes(ext)) {
                    files.push(join(input, entry.name));
                }
            }
        }

        // Sort the files alphabetically
        files.sort((a, b) => a.localeCompare(b));

        const progress = new ProgressBar(":bar :percent", {
            total: files.length,
            width: 50,
        });

        // Report progress on a per-file basis
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await processFile(file);
            progress.tick();
        }
    } else {
        await processFile(input);
    }
}

const program = new Command();

program
    .name("convert-to-hevc")
    .description("Convert video files to HEVC format or apply hvc1 tag if already HEVC")
    .option("-i, --input <input>", "Path to video file or directory")
    .action(async ({ input }) => {
        try {
            await convertToHEVC(input);
        } catch (error) {
            console.error(`${error}`);
            process.exit(1);
        }
    });

program.parse(process.argv);
