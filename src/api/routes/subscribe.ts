import { Subscription } from "$api/schemas.ts";
import { createRoute } from "@hono/zod-openapi";

export default createRoute({
    method: "post",
    path: "/subscribe",
    operationId: "subscribe",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: Subscription,
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: Subscription,
                },
            },
            description: "Subscribe to a TV show",
        },
    },
});
