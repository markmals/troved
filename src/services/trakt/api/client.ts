import createClient, { Middleware, MiddlewareCallbackParams } from 'openapi-fetch';
import type { paths } from './types.ts';

class AuthMiddleware implements Middleware {
    #apiKey = Deno.env.get('TRAKT_CLIENT_ID')!;

    async onRequest({ request }: MiddlewareCallbackParams): Promise<Request> {
        const headers = new Headers(request.headers);
        headers.append('trakt-api-key', this.#apiKey);
        const newRequest = new Request({ ...request, headers });
        return newRequest;
    }
}

export const client = createClient<paths>({ baseUrl: 'https://api.trakt.tv' });
client.use(new AuthMiddleware());
