import type { MiddlewareCallbackParams } from "openapi-fetch";
import createClient from "openapi-fetch";
import type { Middleware } from "src/server/lib/openapi-middleware";
import type { paths } from "./types";

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
