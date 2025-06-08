import AirDates from "$api/routes/air-dates.ts";
import Search from "$api/routes/search.ts";
import Subscribe from "$api/routes/subscribe.ts";
import { OpenAPIHono } from "@hono/zod-openapi";
import { tmdb, trakt } from "./services/mod.ts";

const api = new OpenAPIHono();
api.basePath("/api");

api.openapi(Search, async (c) => {
    const results = await tmdb.searchTV(c.req.valid("query").q);

    return c.json(
        results?.results?.map(({ id, overview, name }) => ({
            id,
            overview,
            name,
        })) ?? [],
        200,
    );
});

api.openapi(AirDates, async (c) => {
    const response = await trakt.airDates({ showId: c.req.valid("query").id });
    return c.json(response);
});

api.openapi(Subscribe, (c) => c.json(c.req.valid("json"), 200));

api.doc("/doc", {
    openapi: "3.1.0",
    info: { title: "Trove", version: "0.1.0" },
});

export default api;
