import { createRoute, z } from "@hono/zod-openapi";
import { AirDates } from "../schemas";

export default createRoute({
    method: "get",
    path: "/air-dates",
    operationId: "airDates",
    request: {
        query: z.object({ id: z.string() }),
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: AirDates,
                },
            },
            description: "Find air dates for a TV show by ID",
        },
    },
});
