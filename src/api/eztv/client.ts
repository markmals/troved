import { API } from '@web/server';
import { EztvApiResponse, EztvTorrent } from './models.ts';

interface EZTVSearchOptions {
    imdb_id: string;
    limit?: number;
    page?: number;
}

export class EZTV extends API {
    protected readonly baseUrl = 'https://eztvx.to/api';

    protected override get(path: string) {
        return super.get(path).headers({});
    }

    protected searchParamsFromObject(obj: Record<string, any>) {
        return Object.entries(obj).reduce((params, [key, value]) => {
            if (value !== undefined) params.set(key, value.toString());
            return params;
        }, new URLSearchParams());
    }

    public async search(options: EZTVSearchOptions) {
        // Remove leadint tt in imdb_id if present
        if (options.imdb_id.startsWith('tt')) {
            options.imdb_id = options.imdb_id.slice(2);
        }

        let response = await this.get(`/get-torrents`)
            .searchParams(this.searchParamsFromObject(options))
            .fetchJson<EztvApiResponse>();

        return response.torrents;
    }
}
