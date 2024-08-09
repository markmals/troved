import { createRoute, z } from 'npm:@hono/zod-openapi';
import { SearchResults } from '../schemas.ts';

export default createRoute({
    method: 'get',
    path: '/search',
    operationId: 'search',
    request: {
        query: z.object({ q: z.string() }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: SearchResults,
                },
            },
            description: 'Search for TV Shows from TheMovieDB',
        },
    },
});
