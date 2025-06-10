import { client } from "./api/client.ts";

export namespace tmdb {
    export async function searchTV(query: string) {
        const { data } = await client.GET("/3/search/tv", {
            params: { query: { query } },
        });

        return data;
    }

    /** Fetch detailed TV series info */
    export async function getSeriesDetails(seriesId: string | number) {
        const { data } = await client.GET("/3/tv/{series_id}", {
            params: { path: { series_id: Number(seriesId) } },
        });
        return data;
    }
}
