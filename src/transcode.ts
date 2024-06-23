import { parseArgs } from 'std/cli/mod.ts';
import Downpour from 'npm:downpour@0.1.1';
import * as path from 'std/path/mod.ts';
import { exists } from 'std/fs/mod.ts';

export interface VideoInfo {
    streams: Stream[];
    format: {
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
            title: string;
            encoder: string;
        };
    };
}

export interface Stream {
    index: number;
    codec_name: string;
    codec_long_name: string;
    profile?: string;
    codec_type: string;
    codec_tag_string: string;
    codec_tag: string;
    width?: number;
    height?: number;
    coded_width?: number;
    coded_height?: number;
    closed_captions?: number;
    film_grain?: number;
    has_b_frames?: number;
    sample_aspect_ratio?: string;
    display_aspect_ratio?: string;
    pix_fmt?: string;
    level?: number;
    color_range?: string;
    chroma_location?: string;
    refs?: number;
    id: string;
    r_frame_rate: string;
    avg_frame_rate: string;
    time_base: string;
    start_pts: number;
    start_time: string;
    duration_ts: number;
    duration: string;
    bit_rate?: string;
    nb_frames: string;
    extradata_size: number;
    disposition: { [key: string]: number };
    tags: {
        language: string;
        handler_name: string;
        vendor_id?: string;
    };
    sample_fmt?: string;
    sample_rate?: string;
    channels?: number;
    channel_layout?: string;
    bits_per_sample?: number;
}

async function ffprobe({ input }: { input: string }): Promise<VideoInfo> {
    let command = new Deno.Command('ffprobe', {
        args: [
            '-i',
            input,

            '-v',
            'quiet',
            '-hide_banner',
            '-print_format',
            'json',
            '-show_format',
            '-show_streams',
        ],
    });

    let result = await command.output();
    let textDecoder = new TextDecoder();

    let error = textDecoder.decode(result.stderr);
    if (error) throw new Error(error);

    return JSON.parse(textDecoder.decode(result.stdout));
}

interface FFmpegOptions {
    input: string;
    output: string;
    audioLanguageCode: string;
    // subtitleLanguageCode: string;
    videoCodec: string;
    videoTag?: string;
    quality: string;
    audioCodec: string;
    audioBitrate: string;
}

async function ffmpeg(options: FFmpegOptions) {
    let tag = options.videoTag !== undefined ? ['-tag:v', options.videoTag] : [];

    let command = new Deno.Command('ffmpeg', {
        args: [
            '-i',
            options.input,

            '-metadata:s:a:0',
            `language=${options.audioLanguageCode}`,

            // '-metadata:s:a:0',
            // `title="${options.subtitleLanguageCode.toUpperCase()}"`,

            '-c:v',
            options.videoCodec,

            ...tag,

            '-crf',
            options.quality,

            '-c:a',
            options.audioCodec,

            '-b:a',
            options.audioBitrate,

            options.output,
        ],
    });

    await command.output();
    // let textDecoder = new TextDecoder();

    // let output = textDecoder.decode(result.stderr);
    // if (error) throw new Error(error);
}

let flags = parseArgs(Deno.args, {
    string: ['watch', 'output-movies', 'output-tv', 'quality', 'bitrate'],
    boolean: ['force-hevc'],
});
if (!flags.watch) throw new Error('Must provide a folder to watch.');
if (!flags['output-movies']) throw new Error('Must provide a folder to output converted movies.');
if (!flags['output-tv']) throw new Error('Must provide a folder to output converted TV shows.');

flags.quality ??= '23';
flags.bitrate ??= '320k';
flags['force-hevc'] ??= false;

let outputMovies = flags['output-movies'];
let outputTv = flags['output-tv'];

const EXTS = ['.mkv', '.mp4'];

for await (let event of Deno.watchFs(flags.watch)) {
    console.log('Event:', event.kind);
    if (event.kind !== 'create') continue;

    for (let addedFile of event.paths) {
        // guard file exists because of a bug in Deno
        if (!(await exists(addedFile))) continue;
        let entry = await Deno.stat(addedFile);

        // If is file and extension is mkv or mp4
        if (entry.isFile && EXTS.includes(path.extname(addedFile))) {
            console.log(`Probing file: ${addedFile}`);

            let info = await ffprobe({ input: addedFile });
            let video = info.streams.find((stream) => stream.codec_type === 'video')!;
            let videoCodec = (video.codec_name === 'h264' && flags['force-hevc']) ? 'libx265' : 'copy';
            let audioCodec = (video.codec_name === 'h264' && flags['force-hevc']) ? 'eac3' : 'copy';
            let videoTag = (video.codec_name === 'h264' && flags['force-hevc']) || video.codec_name === 'hevc'
                ? 'hvc1'
                : undefined;

            let ext = path.extname(addedFile);
            let base = path.basename(addedFile, ext);
            let metadata = new Downpour(base);

            let output = metadata.type === 'tv'
                ? `${outputTv}/${metadata.title}/${metadata.basicPlexName}.mp4`
                : `${outputMovies}/${metadata.basicPlexName}.mp4`;

            // Create output folders from output file path if they don't exist
            await Deno.mkdir(path.dirname(output), { recursive: true });

            console.log(`Transcoding file:\n${addedFile} to \n${output}`);
            await ffmpeg({
                input: addedFile,
                output,
                audioLanguageCode: 'eng',
                // subtitleLanguageCode: 'eng',
                videoCodec,
                videoTag,
                quality: flags.quality,
                audioCodec,
                audioBitrate: flags.bitrate,
            });

            // TODO: Make sure this doesn't happen if there's an ffmpeg error
            await Deno.remove(addedFile);
            console.log('Removed original file:', addedFile);
        } else if (entry.isDirectory) {
            // TODO: Do this for an entire directory, e.g. /Volumes/SSD/Television
            // and all its children
            console.log('Directory change:', addedFile);
        } else {
            console.log('Ignoring file:', addedFile);
        }
    }
}
