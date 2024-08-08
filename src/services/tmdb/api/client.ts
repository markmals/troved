import createClient, { Middleware, MiddlewareCallbackParams } from 'openapi-fetch';
import type { paths } from './types.ts';

class AuthMiddleware implements Middleware {
    #apiKey = Deno.env.get('TMDB_API_KEY')!;

    onRequest({ request }: MiddlewareCallbackParams): Request {
        const url = new URL(request.url);
        url.searchParams.append('api_key', this.#apiKey);
        const newRequest = new Request({ ...request, url: url.toString() });
        return newRequest;
    }
}

export const client = createClient<paths>({ baseUrl: 'https://api.themoviedb.org' });
client.use(new AuthMiddleware());
