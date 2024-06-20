import { API } from '../resty.ts';
import {
    MovieSearchResult,
    SearchResult,
    ShowSearchResult,
} from './models/search-result.ts';

export interface TraktAirDate {
    airs: {
        day: string;
        time: string;
        timezone: string;
    };
}

export class Trakt extends API {
    protected readonly baseUrl = 'https://api.trakt.tv';

    constructor(private apiKey: string) {
        super();
    }

    async search(
        options: { query: string; type: 'movie' },
    ): Promise<MovieSearchResult[]>;
    async search(
        options: { query: string; type: 'show' },
    ): Promise<ShowSearchResult[]>;
    async search(
        options: { id: string; type: 'movie' },
    ): Promise<MovieSearchResult[]>;
    async search(
        options: { id: string; type: 'show' },
    ): Promise<ShowSearchResult[]>;
    async search<Result extends SearchResult>(
        options: { query: string; id?: undefined; type: 'movie' | 'show' } | {
            query?: undefined;
            id: string;
            type: 'movie' | 'show';
        },
    ) {
        return await this.get(
            `search${options.id !== undefined ? `/tmdb/${options.id!}` : ''}`,
        )
            .header('trakt-api-key', this.apiKey)
            .searchParams({ query: options.query, type: options.type })
            .fetchJson<Result[]>();
    }

    async airDates({ showId }: { showId: string }) {
        return await this.get(`shows/${showId}`)
            .header('trakt-api-key', this.apiKey)
            .searchParams({ extended: 'full' })
            .fetchJson<TraktAirDate>()
            .then(({ airs }) => airs);
    }
}

// import 'std/dotenv/load.ts';
// const apiKey = Deno.env.get('TRAKT_CLIENT_ID')!
// console.log(apiKey)
// const client = new Trakt(apiKey);
// console.log((await client.search({ query: 'Breaking Bad', type: 'show' }))[0]);
