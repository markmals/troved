import { OpenAPIHono } from '@hono/zod-openapi';

import airDates from './routes/air-dates.ts';
import search from './routes/search.ts';
import subscribe from './routes/subscribe.ts';

import { tmdb, trakt } from '~/services/mod.ts';

const app = new OpenAPIHono();
app.basePath('/api');

app.openapi(search, async (c) => {
    const results = await tmdb.searchTV(c.req.valid('query').q);

    return c.json(
        results?.results?.map(({ id, overview, name }) => ({
            id,
            overview,
            name,
        })) ?? [],
        200,
    );
});

app.openapi(airDates, async (c) => {
    const response = await trakt.airDates({ showId: c.req.valid('query').id });
    return c.json(response);
});

app.openapi(subscribe, (c) => c.json(c.req.valid('json'), 200));

app.doc('/doc', {
    openapi: '3.1.0',
    info: { title: 'Trove', version: '0.1.0' },
});

export default app;
