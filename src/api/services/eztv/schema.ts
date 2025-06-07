import { z } from "zod";

export const EztvTorrent = z.object({
    title: z.string(),
    imdb_id: z.string(),
    season: z.string(),
    episode: z.string(),
    filename: z.string(),
    torrent_url: z.string(),
    magnet_url: z.string(),
    seeds: z.number(),
    peers: z.number(),
    size_bytes: z.string(),
    date_released_unix: z.number(),

    id: z.number(),
    hash: z.string(),
    small_screenshot: z.string(),
    large_screenshot: z.string(),
});

export const EztvApiResponse = z.object({
    torrents_count: z.number(),
    page: z.number(),
    torrents: z.array(EztvTorrent),
});
