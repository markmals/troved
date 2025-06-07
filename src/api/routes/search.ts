import { SearchResults } from "$api/schemas.ts";
import { createRoute, z } from "@hono/zod-openapi";

export default createRoute({
    method: "get",
    path: "/search",
    operationId: "search",
    request: {
        query: z.object({ q: z.string() }),
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: SearchResults,
                },
            },
            description: "Search for TV Shows from TheMovieDB",
        },
    },
});
