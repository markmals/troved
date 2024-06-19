import { parseArgs } from 'std/cli/mod.ts';
import * as path from 'std/path/mod.ts';

interface VideoInfo {
    streams: { codec_name: string }[];
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

async function ffmpeg({ input, output }: { input: string; output: string }) {
    let command = new Deno.Command('ffmpeg', {
        args: [
            '-i',
            input,

            '-metadata:s:a:0',
            'language=eng',

            '-metadata:s:a:0',
            'title="ENG"',

            '-c:v',
            'libx265',

            '-tag:v',
            'hvc1',

            '-crf',
            '23',

            '-c:a',
            'eac3',

            '-b:a',
            '320k',

            output,
        ],
    });

    let result = await command.output();
    let textDecoder = new TextDecoder();

    let error = textDecoder.decode(result.stderr);
    if (error) throw new Error(error);
}

let flags = parseArgs(Deno.args, { string: ['folder'] });
if (!flags.folder) throw new Error('Must provide a folder.');

const EXTS = ['.mkv', '.mp4'];

for await (let entry of Deno.readDir(flags.folder)) {
    if (entry.isFile && EXTS.includes(path.extname(entry.name))) {
        console.log(entry.name);

        let file = entry.name;
        let info = await ffprobe({ input: file });

        if (info.streams.map((stream) => stream.codec_name).includes('hevc')) {
            continue;
        }

        let ext = path.extname(file);
        let base = path.basename(file, ext);
        // FIXME: Do I need a temporary name for this? h264 could be mp4 too...
        let output = `${flags.folder}/${base}mp4`;

        await ffmpeg({ input: file, output });
        // TODO: Make sure this doesn't happen if there's an ffmpeg error
        await Deno.remove(file);
    } else if (entry.isDirectory) {
        // TODO: Do this for an entire directory, e.g. /Volumes/SSD/Television
        // and all its children
    }
}
