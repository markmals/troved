import { API } from 'resty';
import { EztvApiResponse } from './types.ts';
import { Entries } from 'npm:type-fest';

declare global {
    interface ObjectConstructor {
        entries<T extends object>(o: T): Entries<T>;
    }
}

const fromEntries = <const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
    entries: T,
): { [K in T[number] as K[0]]: K[1] } => {
    return Object.entries(entries) as { [K in T[number] as K[0]]: K[1] };
};

interface EZTVSearchOptions {
    imdb_id: string;
    limit?: number;
    page?: number;
}

class EZTV extends API {
    protected readonly baseUrl = 'https://eztvx.to/api';

    protected createSearchParams(options: EZTVSearchOptions) {
        return new URLSearchParams(
            fromEntries(
                Object.entries(options)
                    .map(([key, value]) => [key, value?.toString()])
                    .filter((tuple): tuple is [string, string] => tuple[1] !== undefined),
            ),
        );
    }

    public async search(options: EZTVSearchOptions) {
        // Remove leadint tt in imdb_id if present
        if (options.imdb_id.startsWith('tt')) {
            options.imdb_id = options.imdb_id.slice(2);
        }

        const response = await this.GET(`/get-torrents`)
            .searchParams(this.createSearchParams(options))
            .fetchJson<EztvApiResponse>();

        return response.torrents;
    }
}

export const eztv = new EZTV();
