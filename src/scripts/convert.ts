import { ffmpeg, ffprobe } from "$api/lib/fast-forward.ts";
import { Command } from "@cliffy/command";
import { exists } from "@std/fs";
import { basename, dirname, extname, join } from "@std/path";
import ProgressBar from "progress";

interface ConvertOptions {
    format: "h264" | "h265";
}

async function moveFile(source: string, destination: string) {
    try {
        await Deno.rename(source, destination);
    } catch (error) {
        if (error instanceof Error && error.message.includes("EXDEV")) {
            await Deno.copyFile(source, destination);
            await Deno.remove(source);
        } else throw error;
    }
}

async function findExternalSub(input: string): Promise<string | undefined> {
    const dir = dirname(input);
    const name = basename(input, extname(input));
    const exts = ["srt", "ttxt", "sub", "txt", "vtt"];
    for (const ext of exts) {
        const file = join(dir, `${name}.${ext}`);
        if (await exists(file)) return file;
    }
    return undefined;
}

function bitmapSubtitleCodecs(): string[] {
    return ["dvdsub", "dvbsub", "pgssub", "xsub"];
}

async function processFile(filePath: string, opts: ConvertOptions) {
    const tempDir = await Deno.makeTempDir({ prefix: "convert-" });
    const tempOutput = join(tempDir, `${basename(filePath, extname(filePath))}.mp4`);
    const finalOutput = join(dirname(filePath), `${basename(filePath, extname(filePath))}.mp4`);

    const fileInfo = await ffprobe({ input: filePath });
    const videoStream = fileInfo.streams.find((s) => s.codec_type === "video");
    const audioStream = fileInfo.streams.find((s) => s.codec_type === "audio");

    const currentVideo = videoStream?.codec_name;
    const currentTag = videoStream?.codec_tag_string;
    const isHEVC = currentVideo === "hevc";
    const isH264 = currentVideo === "h264";

    const subtitleStreams = fileInfo.streams.filter((s) => s.codec_type === "subtitle");
    const bitmapSubs = subtitleStreams.filter((s) => bitmapSubtitleCodecs().includes(s.codec_name));

    const externalSub = await findExternalSub(filePath);

    let videoCodec = "copy";
    let tag: Record<string, string> | undefined;
    if (opts.format === "h265") {
        if (!isHEVC) {
            videoCodec = "libx265";
            tag = { v: "hvc1" };
        } else {
            videoCodec = "copy";
            if (currentTag !== "hvc1") tag = { v: "hvc1" };
        }
    } else if (opts.format === "h264") {
        if (!isH264 && !isHEVC) {
            videoCodec = "libx264";
        } else {
            videoCodec = "copy";
        }
    }

    let audioCodec = "copy";
    let audioBitrate: string | undefined;
    if (audioStream) {
        const layout = audioStream.channel_layout;
        const currentAudio = audioStream.codec_name;
        if (currentAudio !== "aac" && currentAudio !== "eac3") {
            if (layout === "stereo" || layout === "mono") {
                audioCodec = "aac";
                audioBitrate = "192k";
            } else {
                audioCodec = "eac3";
                audioBitrate = "640k";
            }
        }
    }

    const { code, stderr } = await ffmpeg({
        input: [filePath, ...(externalSub ? [externalSub] : [])],
        output: tempOutput,
        videoCodec,
        audioCodec,
        subtitles: externalSub
            ? [{ languageCode: "eng", input: externalSub, codec: "mov_text" }]
            : [],
        preset: opts.format === "h265" && videoCodec !== "copy" ? "medium" : undefined,
        crf: opts.format === "h265" && videoCodec !== "copy" ? 23 : undefined,
        audioBitrate,
        map: "0",
        tag,
        metadata: { "s:a:0": { language: "eng", title: "ENG" } },
        verbosity: "error",
    });

    if (code !== 0) {
        console.error(`Error converting ${filePath}: ${stderr}`);
        await Deno.remove(tempDir, { recursive: true });
        return;
    }

    // Extract bitmap subtitles
    if (bitmapSubs.length > 0) {
        for (let i = 0; i < subtitleStreams.length; i++) {
            const sub = subtitleStreams[i];
            if (!bitmapSubtitleCodecs().includes(sub.codec_name)) continue;
            const subExt = sub.codec_name === "subrip" ? "srt" : sub.codec_name;
            const subOut = join(
                dirname(finalOutput),
                `${basename(finalOutput, ".mp4")}_${i}.${subExt}`,
            );
            const { code: subCode } = await ffmpeg({
                input: [filePath],
                output: subOut,
                subtitles: [],
                map: `0:s:${i}`,
                verbosity: "error",
            });
            if (subCode !== 0) {
                console.error(`Error extracting subtitle from ${filePath}`);
            }
        }
    }

    await moveFile(tempOutput, finalOutput);
    await Deno.remove(filePath);
    await Deno.remove(tempDir, { recursive: true });
    console.log(`Converted ${filePath}`);
}

async function gatherFiles(input: string): Promise<string[]> {
    const info = await Deno.stat(input);
    if (info.isFile) return [input];

    const files: string[] = [];
    for await (const entry of Deno.readDir(input)) {
        const full = join(input, entry.name);
        if (entry.isFile) {
            const ext = extname(entry.name).toLowerCase();
            if ([".mp4", ".mkv", ".avi", ".mov"].includes(ext)) {
                files.push(full);
            }
        }
    }
    files.sort((a, b) => a.localeCompare(b));
    return files;
}

const { args, options } = await new Command()
    .name("convert")
    .description("Convert videos to h264 or h265")
    .arguments("<input:string>")
    .option("-f, --format <format:string>", "Target format (h264|h265)", { default: "h265" })
    .parse(Deno.args);

const input = args[0];
const format = options.format as "h264" | "h265";

const files = await gatherFiles(input);
const progress = new ProgressBar(":bar :current/:total", { total: files.length, width: 50 });
for (const file of files) {
    await processFile(file, { format });
    progress.tick();
}
