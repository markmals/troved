export interface EztvApiResponse {
    torrents_count: number;
    page: number;
    torrents: EztvTorrent[];
}

export interface EztvTorrent {
    title: string;
    imdb_id: string;
    season: string;
    episode: string;
    filename: string;
    torrent_url: string;
    magnet_url: string;
    seeds: number;
    peers: number;
    size_bytes: string;
    date_released_unix: number;

    id: number;
    hash: string;
    small_screenshot: string;
    large_screenshot: string;
}
