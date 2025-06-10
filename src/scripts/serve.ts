import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import { reactRouter } from "./react-router-hono-middleware.ts";

const handler = createRequestHandler(
    // @ts-expect-error React Router server build is not typed
    () => import("../../build/server/index.js"),
    "production",
);

const app = new Hono();

// app.route("/api", api);
app.use(reactRouter(handler));

const port = Number.parseInt(Deno.env.get("PORT") || "3000");

console.log("Starting production server...");
Deno.serve({ port }, app.fetch);
console.log(`Server is running on http://localhost:${port}`);
