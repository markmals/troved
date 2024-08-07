import '@std/dotenv/load';

import { OpenAPIBackend } from 'openapi-backend';
import { createDenoAdapter, defineHandlers, json } from 'openapi-backend-ext';
import { operations } from '~/api/api.d.ts';
import { client as tmdbClient } from '~/services/tmdb/client.ts';
import { Trakt } from '~/services/trakt/client.ts';

const TRAKT_API_KEY = Deno.env.get('TRAKT_CLIENT_ID')!;

const server = new OpenAPIBackend({
    definition: './src/api/openapi.json5',
    handlers: defineHandlers<operations>({
        search: async (ctx) => {
            const { data } = await tmdbClient.GET('/3/search/tv', {
                params: { query: { query: ctx.request.query.q } },
            });

            return json(
                data?.results?.map(({ id, overview, name }) => ({
                    id,
                    overview,
                    name,
                })) ?? [],
            );
        },
        airDates: async (ctx) => {
            const traktClient = new Trakt(TRAKT_API_KEY);
            const response = await traktClient.airDates({ showId: 'searchParams.id' });
            return json(response);
        },
        subscribe: async (ctx) => {
            return json(ctx.request.body);
        },
    }),
});

await server.init();

Deno.serve(createDenoAdapter(server));
