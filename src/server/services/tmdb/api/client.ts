import type { MiddlewareCallbackParams } from "openapi-fetch";
import createClient from "openapi-fetch";
import type { Middleware } from "src/server/lib/openapi-middleware";
import type { paths } from "./types";

class AuthMiddleware implements Middleware {
    #apiKey = process.env.TMDB_API_KEY!;

    onRequest({ request }: MiddlewareCallbackParams): Request {
        const url = new URL(request.url);
        url.searchParams.append("api_key", this.#apiKey);
        return new Request(url, { ...request });
    }
}

export const client = createClient<paths>({ baseUrl: "https://api.themoviedb.org/" });
client.use(new AuthMiddleware());
