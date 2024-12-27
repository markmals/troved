import { Command } from "commander";
import path from "path";
import { transcoder } from "../server/services";

const transcode = new Command();

transcode
    .option("-w, --watch <dir>", "Folder to watch")
    .option("-m, --output-movies <dir>", "Folder to output converted movies")
    .option("-t, --output-tv <dir>", "Folder to output converted TV shows")
    .option("-q, --quality <number>", "Quality setting")
    .option("-b, --bitrate <number>", "Audio bitrate")
    .option("-h, --force-hevc", "Force HEVC encoding")
    .parse(process.argv);

const options = transcode.opts();

if (!options.watch) throw new Error("Must provide a folder to watch.");
if (!options.outputMovies) throw new Error("Must provide a folder to output converted movies.");
if (!options.outputTv) throw new Error("Must provide a folder to output converted TV shows.");

// Expand relative paths to absolute paths
options.watch = path.resolve(options.watch);
options.outputMovies = path.resolve(options.outputMovies);
options.outputTv = path.resolve(options.outputTv);

const handle = transcoder.watch({
    input: options.watch,
    output: { tv: options.outputTv, movies: options.outputMovies },
    forceHEVC: options.forceHevc,
    quality: parseInt(options.quality ?? ""),
    audioBitrate: options.bitrate,
});

// setTimeout(() => handle.unwatch(), 5000);
