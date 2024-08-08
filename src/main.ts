import '@std/dotenv/load';

import { OpenAPIBackend } from 'openapi-backend';
import { createDenoAdapter, defineHandlers, json } from 'openapi-backend-ext';
import definition from './api/trove-v1.json' with { type: 'json' };
import { operations as Operations } from './api/types.ts';

import { tmdb, trakt } from '~/services/mod.ts';

const server = new OpenAPIBackend({
    definition,
    handlers: defineHandlers<Operations>({
        search: async (ctx) => {
            const results = await tmdb.searchTV(ctx.request.query.q);

            return json(
                results?.results?.map(({ id, overview, name }) => ({
                    id,
                    overview,
                    name,
                })) ?? [],
            );
        },
        airDates: async (ctx) => {
            const response = await trakt.airDates({ showId: ctx.request.query.id });
            return json(response);
        },
        subscribe: (ctx) => {
            return json(ctx.request.body);
        },
    }),
});

await server.init();

Deno.serve(createDenoAdapter(server));
