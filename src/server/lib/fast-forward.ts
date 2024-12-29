import { execa } from "execa";

export type FFprobeVerbosity =
    | "quiet"
    | "panic"
    | "fatal"
    | "error"
    | "warning"
    | "info"
    | "verbose"
    | "debug"
    | "trace";
export type FFprobePrintFormat = "default" | "compact" | "csv" | "flat" | "ini" | "json" | "xml";

export interface FFprobeOptions {
    input: string;
    verbosity?: FFprobeVerbosity;
    printFormat?: FFprobePrintFormat;
    showStreams?: boolean;
    showFormat?: boolean;
}

export type FFmpegVerbosity =
    | "quiet"
    | "panic"
    | "fatal"
    | "error"
    | "warning"
    | "info"
    | "verbose"
    | "debug"
    | "trace";
export type FFmpegPreset =
    | "ultrafast"
    | "superfast"
    | "veryfast"
    | "faster"
    | "fast"
    | "medium"
    | "slow"
    | "slower"
    | "veryslow"
    | "placebo";

export interface FFmpegOptions {
    input: string[];
    output: string;
    videoCodec?: string;
    audioCodec?: string;
    preset?: FFmpegPreset;
    crf?: number;
    audioBitrate?: string;
    subtitleCodec?: string;
    map?: string;
    tag?: { [key: string]: string };
    metadata?: { [key: string]: { [key: string]: string } };
    verbosity: FFmpegVerbosity;
}

export interface FFprobeStream {
    index: number;
    codec_name: string;
    codec_long_name: string;
    profile: string;
    codec_type: "video" | "audio" | "subtitle";
    codec_time_base: string;
    codec_tag_string: string;
    codec_tag: string;
    width?: number;
    height?: number;
    coded_width?: number;
    coded_height?: number;
    closed_captions?: number;
    has_b_frames?: number;
    sample_aspect_ratio?: string;
    display_aspect_ratio?: string;
    pix_fmt?: string;
    level?: number;
    color_range?: string;
    color_space?: string;
    color_transfer?: string;
    color_primaries?: string;
    chroma_location?: string;
    field_order?: string;
    timecode?: string;
    refs?: number;
    is_avc?: string;
    nal_length_size?: string;
    id: string;
    r_frame_rate: string;
    avg_frame_rate: string;
    time_base: string;
    start_pts: number;
    start_time: string;
    duration_ts: number;
    duration: string;
    bit_rate: string;
    max_bit_rate?: string;
    bits_per_raw_sample?: string;
    nb_frames: string;
    nb_read_frames?: string;
    nb_read_packets?: string;
    sample_fmt?: string;
    sample_rate?: string;
    channels?: number;
    channel_layout?: string;
    bits_per_sample?: number;
    disposition: {
        default: number;
        dub: number;
        original: number;
        comment: number;
        lyrics: number;
        karaoke: number;
        forced: number;
        hearing_impaired: number;
        visual_impaired: number;
        clean_effects: number;
        attached_pic: number;
        timed_thumbnails: number;
    };
    tags: {
        language?: string;
        handler_name?: string;
        [key: string]: string | undefined;
    };
}

export interface FFprobeFormat {
    filename: string;
    nb_streams: number;
    nb_programs: number;
    format_name: string;
    format_long_name: string;
    start_time: string;
    duration: string;
    size: string;
    bit_rate: string;
    probe_score: number;
    tags: {
        major_brand: string;
        minor_version: string;
        compatible_brands: string;
        encoder: string;
    };
}

export interface FFprobeResult {
    streams: FFprobeStream[];
    format: FFprobeFormat;
}

export async function ffprobe({
    input: filePath,
    verbosity = "quiet",
    printFormat = "json",
    showStreams = true,
    showFormat = true,
}: FFprobeOptions): Promise<FFprobeResult> {
    const args = [
        "-v",
        verbosity,
        "-print_format",
        printFormat,
        ...(showStreams ? ["-show_streams"] : []),
        ...(showFormat ? ["-show_format"] : []),
        filePath,
    ];
    const { stdout, stderr, exitCode } = await execa("ffprobe", args);
    if (exitCode !== 0) {
        throw new Error(`Error running ffprobe: ${stderr}`);
    }
    return JSON.parse(stdout);
}

export async function ffmpeg({
    input,
    output,
    videoCodec,
    audioCodec,
    preset,
    crf,
    audioBitrate,
    subtitleCodec,
    map,
    tag,
    metadata,
    verbosity,
}: FFmpegOptions): Promise<{ code?: number; stderr: string }> {
    const args = input.map(i => ["-i", i]).flat();

    if (videoCodec) args.push("-c:v", videoCodec);
    if (audioCodec) args.push("-c:a", audioCodec);
    if (preset) args.push("-preset", preset);
    if (crf !== undefined) args.push("-crf", crf.toString());
    if (audioBitrate) args.push("-b:a", audioBitrate);
    if (subtitleCodec) args.push("-c:s", subtitleCodec);
    if (map) args.push("-map", map);
    if (tag) {
        Object.entries(tag).forEach(([key, value]) => {
            args.push(`-tag:${key}`, value);
        });
    }
    if (metadata) {
        Object.entries(metadata).forEach(([streamKey, streamMetadata]) => {
            Object.entries(streamMetadata).forEach(([key, value]) => {
                args.push("-metadata", `${streamKey}:${key}=${value}`);
            });
        });
    }
    args.push("-v", verbosity, output);

    const { exitCode, stderr } = await execa("ffmpeg", args);
    return { code: exitCode, stderr };
}
