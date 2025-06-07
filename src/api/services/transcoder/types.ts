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

export interface FFmpegOptions {
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

export interface TranscodeFileOptions {
    inputPath: string;
    outputPath: string;
    forceHEVC?: boolean;
    quality?: number;
    audioBitrate?: string;
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
