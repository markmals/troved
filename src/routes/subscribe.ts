import { defineRoute, HttpMethod, z } from '@web/server';

export default defineRoute({
    path: '/subscribe',
    method: HttpMethod.Post,

    body: {
        accept: 'formData',
        schema: z.object({ id: z.number() }),
    },

    async handler({ body }) {
        return Response.json(body);
    },
});
