import Downpour from 'downpour';
import * as Path from '@std/path';
import * as FileSystem from '@std/fs';

export namespace Transcoder {
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
        const command = new Deno.Command('ffprobe', {
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

        const result = await command.output();
        const textDecoder = new TextDecoder();

        const error = textDecoder.decode(result.stderr);
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
        const tag = options.videoTag !== undefined ? ['-tag:v', options.videoTag] : [];

        const command = new Deno.Command('ffmpeg', {
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
        // const textDecoder = new TextDecoder();

        // const output = textDecoder.decode(result.stderr);
        // if (error) throw new Error(error);
    }

    const EXTS = ['.mkv', '.mp4'];

    export interface TranscodeFileOptions {
        inputPath: string;
        outputPath: string;
        forceHEVC?: boolean;
        quality?: number;
        audioBitrate?: string;
    }

    export async function transcodeFile(
        { inputPath, outputPath, quality = 23, audioBitrate = '320k', forceHEVC = false }: TranscodeFileOptions,
    ) {
        const info = await ffprobe({ input: inputPath });
        const video = info.streams.find((stream) => stream.codec_type === 'video')!;

        const shouldConvert = video.codec_name === 'h264' && forceHEVC;
        const isHEVC = video.codec_name === 'hevc';

        const videoCodec = shouldConvert ? 'libx265' : 'copy';
        const audioCodec = shouldConvert ? 'eac3' : 'copy';
        const videoTag = shouldConvert || isHEVC ? 'hvc1' : undefined;

        // Create output folders from output file path if they don't exist
        await Deno.mkdir(Path.dirname(outputPath), { recursive: true });

        await ffmpeg({
            input: inputPath,
            output: outputPath,
            audioLanguageCode: 'eng',
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

    export interface WatchOptions {
        input: string;
        output: {
            movies: string;
            tv: string;
        };
        quality?: number;
        audioBitrate?: string;
        forceHEVC?: boolean;
    }

    function getOutputPath(inputPath: string, tvPath: string, moviesPath: string) {
        const ext = Path.extname(inputPath);
        const basename = Path.basename(inputPath, ext);
        const metadata = new Downpour(basename);
        return metadata.type === 'tv'
            ? `${tvPath}/${metadata.title}/${metadata.basicPlexName}.mp4`
            : `${moviesPath}/${metadata.basicPlexName}.mp4`;
    }

    export function watch({ input, output, quality, audioBitrate, forceHEVC }: WatchOptions) {
        const watcher = Deno.watchFs(input);

        async function startWatching() {
            for await (const event of watcher) {
                if (event.kind !== 'create') continue;

                for (const eventPath of event.paths) {
                    // guard file exists because of a bug in Deno
                    if (!(await FileSystem.exists(eventPath))) continue;
                    const entry = await Deno.stat(eventPath);

                    // If is file and extension is mkv or mp4
                    if (entry.isFile && EXTS.includes(Path.extname(eventPath))) {
                        transcodeFile({
                            inputPath: eventPath,
                            outputPath: getOutputPath(eventPath, output.tv, output.movies),
                            quality,
                            audioBitrate,
                            forceHEVC,
                        });
                    } else if (entry.isDirectory) {
                        // TODO: Do this for an entire directory and all its children
                        // e.g. /Volumes/SSD/Television
                        console.log('Directory change:', eventPath);
                    } else {
                        console.log('Ignoring file:', eventPath);
                    }
                }
            }
        }

        startWatching();

        return {
            unwatch: watcher.close,
        };
    }
}
