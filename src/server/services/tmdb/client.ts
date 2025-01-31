import { client } from "./api/client";

export namespace tmdb {
    export async function searchTV(query: string) {
        const { data } = await client.GET("/3/search/tv", {
            params: { query: { query } },
        });

        return data;
    }
}
