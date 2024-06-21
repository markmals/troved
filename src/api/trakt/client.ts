import { API } from '@web/server';
import { MovieSearchResult, SearchResult, ShowSearchResult } from './models/search-result.ts';

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

    async search(options: { query: string; type: 'movie' }): Promise<MovieSearchResult[]>;
    async search(options: { query: string; type: 'show' }): Promise<ShowSearchResult[]>;
    async search(options: { id: string; type: 'movie' }): Promise<MovieSearchResult[]>;
    async search(options: { id: string; type: 'show' }): Promise<ShowSearchResult[]>;
    async search<Result extends SearchResult>(
        options: { query: string; id?: undefined; type: 'movie' | 'show' } | {
            query?: undefined;
            id: string;
            type: 'movie' | 'show';
        },
    ) {
        const searchEndpoint = options.id ? `tmdb/${options.id}` : '';
        return await this.get(`search/${searchEndpoint}`)
            .searchParams({ query: options.query, type: options.type })
            .fetchJson<Result[]>();
    }

    async airDates({ showId }: { showId: string }) {
        return await this.get(`shows/${showId}`)
            .searchParams({ extended: 'full' })
            .fetchJson<TraktAirDate>()
            .then(({ airs }) => airs);
    }

    protected override get(path: string) {
        // Add auth to all requests
        return super.get(path).headers({ 'trakt-api-key': this.apiKey });
    }
}

// import 'std/dotenv/load.ts';
// const apiKey = Deno.env.get('TRAKT_CLIENT_ID')!
// console.log(apiKey)
// const client = new Trakt(apiKey);
// console.log((await client.search({ query: 'Breaking Bad', type: 'show' }))[0]);
