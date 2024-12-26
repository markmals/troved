import { get } from "src/server/lib/simple-resty";
import { EztvApiResponse } from "src/server/services/eztv/schema";

const fromEntries = <const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
    entries: T,
): { [K in T[number] as K[0]]: K[1] } => {
    return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};

export namespace eztv {
    interface SearchOptions {
        imdb_id: string;
        limit?: number;
        page?: number;
    }

    const BASE_URL = "https://eztvx.to/api";

    function createSearchParams(options: SearchOptions): URLSearchParams {
        // Remove leadint tt in imdb_id if present
        if (options.imdb_id.startsWith("tt")) {
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

    function createURL(path: string, options: SearchOptions): URL {
        const url = new URL(`${BASE_URL}/${path}`);
        for (const [key, value] of createSearchParams(options)) {
            url.searchParams.append(key, value);
        }
        return url;
    }

    export async function search(options: SearchOptions) {
        const url = createURL("get-torrents", options);

        const response = await get(url.toString(), {
            schema: EztvApiResponse,
        });

        return response.torrents;
    }
}
