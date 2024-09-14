import { Command } from 'cliffy';
import { walk } from '@std/fs';
import { basename, dirname, extname, join } from '@std/path';
import ProgressBar from 'jsr:@deno-library/progress';

async function convertToHEVC(input: string) {
    const isDirectory = (await Deno.stat(input)).isDirectory;

    async function processFile(filePath: string) {
        const tempDir = await Deno.makeTempDir();
        const tempOutputPath = join(tempDir, `${basename(filePath, extname(filePath))}.mp4`);
        const finalOutputPath = join(
            dirname(filePath),
            `${basename(filePath, extname(filePath))}.mp4`,
        );

        // Use ffprobe to get video, audio and subtitle information
        const ffprobeCommand = new Deno.Command('ffprobe', {
            args: [
                '-v',
                'quiet',
                '-print_format',
                'json',
                '-show_streams',
                '-show_format',
                filePath,
            ],
        });
        const ffprobeOutput = await ffprobeCommand.output();
        if (ffprobeOutput.code !== 0) {
            console.error(
                `Error running ffprobe: ${new TextDecoder().decode(ffprobeOutput.stderr)}`,
            );
            Deno.exit(1);
        }
        const fileInfo = JSON.parse(new TextDecoder().decode(ffprobeOutput.stdout));

        // Check if the video is already HEVC
        const videoStream = fileInfo.streams.find((stream: any) => stream.codec_type === 'video');
        const isHEVC = videoStream?.codec_name === 'hevc';
        const hasHVC1Tag = videoStream?.tags?.['tag:hvc1'] === '1';

        if (isHEVC && hasHVC1Tag) {
            console.log(`${filePath} is already HEVC with hvc1 tag. Skipping.`);
            return;
        }

        if (isHEVC && !hasHVC1Tag) {
            // Apply hvc1 tag only
            const tagCommand = new Deno.Command('ffmpeg', {
                args: [
                    '-i',
                    filePath,
                    '-c',
                    'copy',
                    '-tag:v',
                    'hvc1',
                    '-c:s',
                    'mov_text',
                    '-map',
                    '0',
                    '-movflags',
                    '+faststart',
                    '-metadata:s:a:0',
                    'language=eng',
                    '-metadata:s:s:0',
                    'language=eng',
                    '-v',
                    'error',
                    tempOutputPath,
                ],
            });
            const tagProcess = tagCommand.spawn();
            const { code, stderr } = await tagProcess.output();

            if (code === 0) {
                await Deno.remove(filePath);
                await Deno.rename(tempOutputPath, finalOutputPath);
                console.log(`Applied hvc1 tag to ${filePath}`);
            } else {
                console.error(
                    `Error applying hvc1 tag to ${filePath}: ${new TextDecoder().decode(stderr)}`,
                );
                await Deno.remove(tempDir, { recursive: true });
                Deno.exit(1);
            }
            await Deno.remove(tempDir, { recursive: true });
            return;
        }

        // If not HEVC, proceed with full conversion
        // Determine audio codec and channel layout
        const audioStream = fileInfo.streams.find((stream: any) => stream.codec_type === 'audio');
        const currentAudioCodec = audioStream?.codec_name;
        const channelLayout = audioStream?.channel_layout;

        let audioCodec = '-c:a copy';
        if (currentAudioCodec !== 'aac' && currentAudioCodec !== 'eac3') {
            if (channelLayout === 'stereo' || channelLayout === 'mono') {
                audioCodec = '-c:a aac -b:a 192k';
            } else {
                audioCodec = '-c:a eac3 -b:a 640k';
            }
        }

        // Determine subtitle handling
        const subtitleStreams = fileInfo.streams.filter((stream: any) =>
            stream.codec_type === 'subtitle'
        );
        let subtitleHandling = '-c:s mov_text';
        let extractSubtitles = false;

        const bitmapSubtitleFormats = ['dvdsub', 'dvbsub', 'pgssub', 'xsub'];
        for (const subStream of subtitleStreams) {
            if (bitmapSubtitleFormats.includes(subStream.codec_name)) {
                extractSubtitles = true;
                break;
            }
        }

        if (extractSubtitles) {
            subtitleHandling = '-sn';
        }

        const ffmpegCommand = [
            '-i',
            filePath,
            '-metadata:s:a:0',
            'language=eng',
            '-metadata:s:a:0',
            'title="ENG"',
            '-c:v',
            'libx265',
            '-preset',
            'medium',
            '-crf',
            '23',
            ...audioCodec.split(' '),
            subtitleHandling,
            '-tag:v',
            'hvc1',
            '-movflags',
            '+faststart',
            '-v',
            'error',
            tempOutputPath,
        ];

        const command = new Deno.Command('ffmpeg', {
            args: ffmpegCommand,
            stdout: 'piped',
            stderr: 'piped',
        });
        const process = command.spawn();

        const { code, stderr } = await process.output();

        if (code !== 0) {
            console.error(`Error converting ${filePath}: ${new TextDecoder().decode(stderr)}`);
            await Deno.remove(tempDir, { recursive: true });
            Deno.exit(1);
        }

        if (extractSubtitles) {
            for (let i = 0; i < subtitleStreams.length; i++) {
                const subStream = subtitleStreams[i];
                const subExt = subStream.codec_name === 'subrip' ? 'srt' : subStream.codec_name;
                const subtitleOutputPath = join(
                    dirname(finalOutputPath),
                    `${basename(finalOutputPath, '.mp4')}_${i}.${subExt}`,
                );
                const extractCommand = new Deno.Command('ffmpeg', {
                    args: ['-i', filePath, '-map', `0:s:${i}`, '-v', 'error', subtitleOutputPath],
                });
                const { code, stderr } = await extractCommand.output();
                if (code !== 0) {
                    console.error(`Error extracting subtitle: ${new TextDecoder().decode(stderr)}`);
                    await Deno.remove(tempDir, { recursive: true });
                    Deno.exit(1);
                }
            }
        }
        await Deno.remove(filePath);
        await Deno.rename(tempOutputPath, finalOutputPath);
        console.log(`Successfully converted ${filePath} to HEVC`);
        await Deno.remove(tempDir, { recursive: true });
    }

    if (isDirectory) {
        const files = [];
        for await (const entry of walk(input, { exts: ['.mp4', '.mkv', '.avi', '.mov'] })) {
            if (entry.isFile) {
                files.push(entry.path);
            }
        }

        const progressBar = new ProgressBar({
            total: files.length,
            width: 50,
            complete: '=',
            incomplete: '-',
            display: ':bar :percent :etas',
        });

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await processFile(file);
            await progressBar?.render(index + 1);
        }
    } else {
        await processFile(input);
    }
}

try {
    await new Command()
        .name('convert-to-hevc')
        .description('Convert video files to HEVC format or apply hvc1 tag if already HEVC')
        .option('-i, --input <input:string>', 'Path to video file or directory', {
            required: true,
        })
        .action(async ({ input }) => {
            await convertToHEVC(input);
        })
        .parse(Deno.args);
} catch (error) {
    console.error(`${error}`);
    Deno.exit(1);
}
