import { trpc } from '../server/trpc.ts';
import { z } from '@zod/core';
import { zfd } from '@zod/form-data';
import { MovieDb as TheMovieDB } from 'tmdb';
import { Trakt } from '../lib/trakt/client.ts';

const TMDB_API_KEY = Deno.env.get('TMDB_API_KEY')!;
const TRAKT_API_KEY = Deno.env.get('TRAKT_CLIENT_ID')!;

namespace Schema {
    export namespace Search {
        export const input = z.object({ query: z.string() });
        export const result = z.array(
            z.object({
                id: z.number().optional(),
                overview: z.string().optional(),
                name: z.string().optional(),
            }),
        );
    }

    export namespace AirDate {
        export const input = z.object({ showId: z.number() });
        export const output = z.object({
            day: z.string(),
            time: z.string(),
            timezone: z.string(),
        });
    }

    export namespace Subscribe {
        export const input = zfd.formData({
            showId: zfd.numeric(z.number()),
        });
    }
}

export const tvShowsRouter = trpc.router({
    search: trpc.procedure
        .meta({ openapi: { method: 'GET', path: '/search' } })
        .input(Schema.Search.input)
        .output(Schema.Search.result)
        .query(async ({ input: { query } }) => {
            const client = new TheMovieDB(TMDB_API_KEY);
            const response = await client.searchTv({ query });
            return response.results?.map(({ id, overview, name }) => ({
                id,
                overview,
                name,
            })) ?? [];
        }),
    airDate: trpc.procedure
        .meta({ openapi: { method: 'GET', path: '/air-date' } })
        .input(Schema.AirDate.input)
        .output(Schema.AirDate.output)
        .query(async ({ input: { showId } }) => {
            const client = new Trakt(TRAKT_API_KEY);
            return await client.airDates({ showId });
        }),
    subscribe: trpc.procedure
        .meta({ openapi: { method: 'POST', path: '/subscribe' } })
        .input(Schema.Subscribe.input)
        // FIXME: These types should be inferred
        // Following the example from: https://github.com/trpc/trpc/tree/next/examples/next-formdata
        .mutation(async ({ input: { showId } }: { input: any }) => {
            console.log(showId);
        }),
});
