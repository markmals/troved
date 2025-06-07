import type { Middleware } from "$api/lib/openapi-middleware.ts";
import type { MiddlewareCallbackParams } from "openapi-fetch";
import createClient from "openapi-fetch";
import type { paths } from "./types.ts";

class AuthMiddleware implements Middleware {
    #apiKey = process.env.TRAKT_CLIENT_ID!;

    onRequest({ request }: MiddlewareCallbackParams): Request {
        const headers = new Headers(request.headers);
        headers.append("trakt-api-key", this.#apiKey);
        return new Request(request.url, { ...request, headers });
    }
}

export const client = createClient<paths>({ baseUrl: "https://api.trakt.tv/" });
client.use(new AuthMiddleware());
