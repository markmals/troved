import { defineRoute, HttpMethod, z } from '@web/server';
import { MovieDb as TheMovieDB } from 'tmdb';

const TMDB_API_KEY = Deno.env.get('TMDB_API_KEY')!;

export default defineRoute({
    path: '/search',
    method: HttpMethod.Get,

    searchParams: { schema: { q: z.string() } },

    async handler({ searchParams }) {
        let client = new TheMovieDB(TMDB_API_KEY);
        let response = await client.searchTv({ query: searchParams.q });
        return Response.json(
            response.results?.map(({ id, overview, name }) => ({
                id,
                overview,
                name,
            })),
        );
    },
});
