import { get } from '~/lib/simple-resty.ts';
import { EztvApiResponse } from '~/services/eztv/schema.ts';

const fromEntries = <const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
    entries: T,
): { [K in T[number] as K[0]]: K[1] } => {
    return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};

interface EztvSearchOptions {
    imdb_id: string;
    limit?: number;
    page?: number;
}

const BASE_URL = 'https://eztvx.to/api';

function createSearchParams(options: EztvSearchOptions): URLSearchParams {
    // Remove leadint tt in imdb_id if present
    if (options.imdb_id.startsWith('tt')) {
        options.imdb_id = options.imdb_id.slice(2);
    }

    return new URLSearchParams(
        fromEntries(
            Object.entries(options)
                .map(([key, value]) => [key, value?.toString()])
                .filter((tuple): tuple is [string, string] => tuple[1] !== undefined),
        ),
    );
}

function createURL(path: string, options: EztvSearchOptions): URL {
    const url = new URL(`${BASE_URL}/${path}`);
    for (const [key, value] of createSearchParams(options)) {
        url.searchParams.append(key, value);
    }
    return url;
}

export async function searchEztv(options: EztvSearchOptions) {
    const url = createURL('get-torrents', options);

    const response = await get(url.toString(), {
        schema: EztvApiResponse,
    });

    return response.torrents;
}
