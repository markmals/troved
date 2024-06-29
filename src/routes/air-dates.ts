import { createRoute, HttpMethod, z } from '@web/server';
import { Trakt } from '../api/trakt/client.ts';

const TRAKT_API_KEY = Deno.env.get('TRAKT_CLIENT_ID')!;

export default createRoute({
    path: '/air-dates',
    method: HttpMethod.Get,

    searchParams: { schema: { id: z.string() } },

    async handler({ searchParams }) {
        let client = new Trakt(TRAKT_API_KEY);
        let response = await client.airDates({ showId: searchParams.id });
        return Response.json(response);
    },
});
