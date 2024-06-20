import { API } from '../resty.ts';
import 'std/dotenv/load.ts';
import { SearchResult, ShowSearchResult } from './models/search-result.ts';

export class Trakt extends API {
    protected readonly baseUrl = 'https://api.trakt.tv';

    readonly apiKey = Deno.env.get('TRAKT_CLIENT_ID')!;
    readonly apiSecret = Deno.env.get('TRAKT_API_SECRET')!;

    private async search<T extends SearchResult>(
        query: string,
        type: 'show' | 'movie',
    ) {
        return await this
            .get('/search')
            .header('trakt-api-key', this.apiKey)
            .searchParams({ query, type })
            .fetchJson<T[]>();
    }

    async searchShows(query: string) {
        return await this.search<ShowSearchResult>(query, 'show');
    }
}

