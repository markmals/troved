export interface SearchResult {
    type: string;
    score: number;
    movie?: Movie;
    show?: Movie;
    episode?: Episode;
    person?: Person;
    list?: List;
}

export interface Episode {
    season: number;
    number: number;
    title: string;
    ids: EpisodeIds;
}

export interface EpisodeIds {
    trakt: number;
    tvdb?: number;
    imdb: null | string;
    tmdb: number;
    slug?: string;
}

export interface List {
    name: string;
    description: string;
    privacy: string;
    share_link: string;
    type: string;
    display_numbers: boolean;
    allow_comments: boolean;
    sort_by: string;
    sort_how: string;
    created_at: Date;
    updated_at: Date;
    item_count: number;
    comment_count: number;
    likes: number;
    ids: ListIds;
    user: User;
}

export interface ListIds {
    trakt: number;
    slug: string;
}

export interface User {
    username: string;
    private: boolean;
    name: string;
    vip: boolean;
    vip_ep: boolean;
    ids: UserIds;
}

export interface UserIds {
    slug: string;
}

export interface Movie {
    title: string;
    year: number;
    ids: EpisodeIds;
}

export interface Person {
    name: string;
    ids: EpisodeIds;
}
