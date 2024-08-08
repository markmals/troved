import { client } from '~/services/tmdb/api/client.ts';

class TheMovieDB {
    public async searchTV(query: string) {
        const { data } = await client.GET('/3/search/tv', {
            params: { query: { query } },
        });

        return data;
    }
}

export const tmdb = new TheMovieDB();
export type { TheMovieDB };
