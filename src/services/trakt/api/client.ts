import createClient, { Middleware, MiddlewareCallbackParams } from 'openapi-fetch';
import type { paths } from './types.ts';

class AuthMiddleware implements Middleware {
    #apiKey = Deno.env.get('TRAKT_CLIENT_ID')!;

    onRequest({ request }: MiddlewareCallbackParams): Request {
        const headers = new Headers(request.headers);
        headers.append('trakt-api-key', this.#apiKey);
        const newRequest = new Request(request.url, { ...request, headers });
        return newRequest;
    }
}

export const client = createClient<paths>({ baseUrl: 'https://api.trakt.tv/' });
client.use(new AuthMiddleware());
