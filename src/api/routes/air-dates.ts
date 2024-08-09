import { createRoute, z } from 'npm:@hono/zod-openapi';
import { AirDates } from '../schemas.ts';

export default createRoute({
    method: 'get',
    path: '/air-dates',
    operationId: 'airDates',
    request: {
        query: z.object({ id: z.string() }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: AirDates,
                },
            },
            description: 'Find air dates for a TV show by ID',
        },
    },
});
