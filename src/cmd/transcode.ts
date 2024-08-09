import * as cli from '@std/cli/parse-args';
import { transcoder } from '../services/mod.ts';

const flags = cli.parseArgs(Deno.args, {
    string: ['watch', 'output-movies', 'output-tv', 'quality', 'bitrate'],
    boolean: ['force-hevc'],
});

if (!flags.watch) throw new Error('Must provide a folder to watch.');
if (!flags['output-movies']) throw new Error('Must provide a folder to output converted movies.');
if (!flags['output-tv']) throw new Error('Must provide a folder to output converted TV shows.');

const handle = transcoder.watch({
    input: flags.watch,
    output: { tv: flags['output-tv'], movies: flags['output-movies'] },
    forceHEVC: flags['force-hevc'],
    quality: parseInt(flags.quality ?? ''),
    audioBitrate: flags.bitrate,
});

setTimeout(() => handle.unwatch(), 5000);
