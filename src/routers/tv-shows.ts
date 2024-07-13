import { trpc } from '../server/trpc.ts';
import { MovieDb as TheMovieDB } from 'tmdb';
import type { AirDate, TVSearchResult } from './types.ts';
import { z } from 'zod';
import { Trakt } from '../lib/trakt/client.ts';

const TMDB_API_KEY = Deno.env.get('TMDB_API_KEY')!;
const TRAKT_API_KEY = Deno.env.get('TRAKT_CLIENT_ID')!;

export const tvShowsRouter = trpc.router({
    search: trpc.procedure
        .input(z.object({ query: z.string() }))
        .query<TVSearchResult[]>(async ({ input: { query } }) => {
            const client = new TheMovieDB(TMDB_API_KEY);
            const response = await client.searchTv({ query });
            return response.results?.map(({ id, overview, name }) => ({
                id,
                overview,
                name,
            })) ?? [];
        }),
    airDate: trpc.procedure
        .input(z.object({ showId: z.number() }))
        .query<AirDate>(async ({ input: { showId } }) => {
            const client = new Trakt(TRAKT_API_KEY);
            return await client.airDates({ showId });
        }),
    subscribe: trpc.procedure
        .input(z.object({ showId: z.number() }))
        .mutation(async ({ input: { showId } }) => {
            console.log(showId);
        }),
});
