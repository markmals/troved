import { OpenAPIBackend } from 'openapi-backend';

export function createDenoAdapter(api: OpenAPIBackend<any>): Deno.ServeHandler {
    return (request) => {
        const { pathname, search } = new URL(request.url);

        return api.handleRequest(
            {
                path: pathname,
                query: search,
                method: request.method,
                headers: Object.fromEntries(request.headers),
                body: request.body,
            },
            request,
            new Response(null, { status: 200 }),
        );
    };
}
