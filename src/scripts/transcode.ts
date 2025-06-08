import { transcoder } from "$api/services/mod.ts";
import { Command } from "@cliffy/command";
import { resolve } from "@std/path";

const { options } = await new Command()
    .name("transcode")
    .description("Transcode video files")
    .option("-w, --watch <dir:string>", "Folder to watch", { required: true })
    .option("-m, --output-movies <dir:string>", "Folder to output converted movies", {
        required: true,
    })
    .option("-t, --output-tv <dir:string>", "Folder to output converted TV shows", {
        required: true,
    })
    .option("-q, --quality <number:number>", "Quality setting")
    .option("-b, --bitrate <number:string>", "Audio bitrate")
    .option("-h, --force-hevc", "Force HEVC encoding")
    .parse(Deno.args);

const { watch, outputMovies, outputTv, quality, bitrate, forceHevc } = options;

// Expand relative paths to absolute paths
const resolvedWatch = resolve(watch);
const resolvedOutputMovies = resolve(outputMovies);
const resolvedOutputTv = resolve(outputTv);

// biome-ignore lint/correctness/noUnusedVariables: for testing
const handle = transcoder.watch({
    input: resolvedWatch,
    output: { tv: resolvedOutputTv, movies: resolvedOutputMovies },
    forceHEVC: forceHevc,
    quality: quality ? Number.parseInt(quality.toString()) : undefined,
    audioBitrate: bitrate,
});

// setTimeout(() => handle.unwatch(), 5000);
