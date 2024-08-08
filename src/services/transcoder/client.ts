import Downpour from 'downpour';
import * as path from '@std/path';
import * as fs from '@std/fs';
import {
    FFmpegOptions,
    TranscodeFileOptions,
    VideoInfo,
    WatchOptions,
} from '~/services/transcoder/types.ts';

class Transcoder {
    protected async ffprobe({ input }: { input: string }): Promise<VideoInfo> {
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

    protected async ffmpeg(options: FFmpegOptions) {
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

    private exts = ['.mkv', '.mp4'];

    public async transcodeFile(
        { inputPath, outputPath, quality = 23, audioBitrate = '320k', forceHEVC = false }:
            TranscodeFileOptions,
    ) {
        const info = await this.ffprobe({ input: inputPath });
        const video = info.streams.find((stream) => stream.codec_type === 'video')!;

        const shouldConvert = video.codec_name === 'h264' && forceHEVC;
        const isHEVC = video.codec_name === 'hevc';

        const videoCodec = shouldConvert ? 'libx265' : 'copy';
        const audioCodec = shouldConvert ? 'eac3' : 'copy';
        const videoTag = shouldConvert || isHEVC ? 'hvc1' : undefined;

        // Create output folders from output file path if they don't exist
        await Deno.mkdir(path.dirname(outputPath), { recursive: true });

        await this.ffmpeg({
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

    private getOutputPath(inputPath: string, tvPath: string, moviesPath: string) {
        const ext = path.extname(inputPath);
        const basename = path.basename(inputPath, ext);
        const metadata = new Downpour(basename);
        return metadata.type === 'tv'
            ? `${tvPath}/${metadata.title}/${metadata.basicPlexName}.mp4`
            : `${moviesPath}/${metadata.basicPlexName}.mp4`;
    }

    public watch({ input, output, quality, audioBitrate, forceHEVC }: WatchOptions) {
        const watcher = Deno.watchFs(input);

        (async () => {
            for await (const event of watcher) {
                if (event.kind !== 'create') continue;

                for (const eventPath of event.paths) {
                    // guard file exists because of a bug in Deno
                    if (!(await fs.exists(eventPath))) continue;
                    const entry = await Deno.stat(eventPath);

                    // If is file and extension is mkv or mp4
                    if (entry.isFile && this.exts.includes(path.extname(eventPath))) {
                        this.transcodeFile({
                            inputPath: eventPath,
                            outputPath: this.getOutputPath(eventPath, output.tv, output.movies),
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
        })();

        return {
            unwatch: watcher.close,
        };
    }
}

export const transcoder = new Transcoder();
export type { Transcoder };
