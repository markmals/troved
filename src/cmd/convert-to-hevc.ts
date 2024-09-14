import { Command } from 'cliffy';
import { walk } from '@std/fs';
import { basename, dirname, extname, join } from '@std/path';
import ProgressBar from 'jsr:@deno-library/progress';
import { ffmpeg, ffprobe } from './fast-forward.ts';

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
        const fileInfo = await ffprobe({
            filePath,
            verbosity: 'quiet',
            printFormat: 'json',
            showStreams: true,
            showFormat: true,
        });

        // Check if the video is already HEVC
        const videoStream = fileInfo.streams.find((stream) => stream.codec_type === 'video');
        const isHEVC = videoStream?.codec_name === 'hevc';
        const hasHVC1Tag = videoStream?.codec_tag_string === 'hvc1';

        if (isHEVC && hasHVC1Tag) {
            console.log(`${filePath} is already HEVC with hvc1 tag. Skipping.`);
            return;
        }

        if (isHEVC && !hasHVC1Tag) {
            // Apply hvc1 tag only
            const tagProcess = ffmpeg({
                input: filePath,
                output: tempOutputPath,
                videoCodec: 'copy',
                audioCodec: 'copy',
                subtitleCodec: 'mov_text',
                map: '0',
                tag: { v: 'hvc1' },
                metadata: { 's:a:0': { language: 'eng', title: 'ENG' } },
                verbosity: 'error',
            });
            const { code, stderr } = await tagProcess.output();

            if (code === 0) {
                await Deno.remove(filePath);
                await moveFile(tempOutputPath, finalOutputPath);
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
        const audioStream = fileInfo.streams.find((stream) => stream.codec_type === 'audio');
        const currentAudioCodec = audioStream?.codec_name;
        const channelLayout = audioStream?.channel_layout;

        let audioCodec = 'copy';
        let audioBitrate;
        if (currentAudioCodec !== 'aac' && currentAudioCodec !== 'eac3') {
            if (channelLayout === 'stereo' || channelLayout === 'mono') {
                audioCodec = 'aac';
                audioBitrate = '192k';
            } else {
                audioCodec = 'eac3';
                audioBitrate = '640k';
            }
        }

        // Determine subtitle handling
        const subtitleStreams = fileInfo.streams.filter((stream) =>
            stream.codec_type === 'subtitle'
        );
        let subtitleCodec: string | undefined = 'mov_text';
        let extractSubtitles = false;

        const bitmapSubtitleFormats = ['dvdsub', 'dvbsub', 'pgssub', 'xsub'];
        for (const subStream of subtitleStreams) {
            if (bitmapSubtitleFormats.includes(subStream.codec_name)) {
                extractSubtitles = true;
                break;
            }
        }

        if (extractSubtitles) {
            subtitleCodec = undefined;
        }

        const process = ffmpeg({
            input: filePath,
            output: tempOutputPath,
            videoCodec: 'libx265',
            audioCodec,
            preset: 'medium',
            crf: 23,
            audioBitrate,
            subtitleCodec,
            tag: { v: 'hvc1' },
            metadata: { 's:a:0': { language: 'eng', title: 'ENG' } },
            verbosity: 'error',
        });

        const decoder = new TextDecoder();
        let duration: number | null = null;
        let progress = 0;

        const ffmpegProgressBar = new ProgressBar({
            total: 100,
            width: 50,
        });

        try {
            for await (const chunk of process.stderr) {
                const output = decoder.decode(chunk);
                if (!duration) {
                    const match = output.match(/Duration: (\d{2}):(\d{2}):(\d{2})/);
                    if (match) {
                        duration = parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 +
                            parseInt(match[3]);
                    }
                }
                const timeMatch = output.match(/time=(\d{2}):(\d{2}):(\d{2})/);
                if (timeMatch && duration) {
                    const currentTime = parseInt(timeMatch[1]) * 3600 +
                        parseInt(timeMatch[2]) * 60 +
                        parseInt(timeMatch[3]);
                    progress = currentTime / duration;
                    ffmpegProgressBar.render(progress * 100, {
                        text: `Converting ${basename(filePath)}`,
                    });
                }
            }
        } catch (error) {
            console.error(`Error reading stderr: ${error.message}`);
            // Continue with the conversion, but we won't be able to show progress
        }

        const { code, stderr } = await process.output();

        if (code !== 0) {
            console.error(
                `Error converting ${filePath}: \n${decoder.decode(stderr).trim()}`,
            );
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
                const extractProcess = ffmpeg({
                    input: filePath,
                    output: subtitleOutputPath,
                    map: `0:s:${i}`,
                    verbosity: 'error',
                });
                const { code, stderr } = await extractProcess.output();
                if (code !== 0) {
                    console.error(`Error extracting subtitle: ${decoder.decode(stderr)}`);
                    await Deno.remove(tempDir, { recursive: true });
                    Deno.exit(1);
                }
            }
        }
        await Deno.remove(filePath);
        await moveFile(tempOutputPath, finalOutputPath);
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

        // Sort the files alphabetically
        files.sort((a, b) => a.localeCompare(b));

        const overallProgressBar = new ProgressBar({
            total: files.length,
            width: 50,
        });

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await processFile(file, overallProgressBar);
            overallProgressBar.render(index + 1, {
                text: `Completed ${index + 1}/${files.length} files`,
            });
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

async function moveFile(source: string, destination: string) {
    try {
        await Deno.rename(source, destination);
    } catch (error) {
        if (error instanceof Error && error.message.includes('os error 18')) {
            // If rename fails due to cross-device error, use copy and remove
            await Deno.copyFile(source, destination);
            await Deno.remove(source);
        } else {
            throw error;
        }
    }
}
