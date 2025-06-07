import { Hono } from "hono";
import type { AppLoadContext } from "react-router";
import { guestBook } from "./routes/guest-book.ts";

export type ReactRouterBindings = { Bindings: { context: AppLoadContext } };

const api = new Hono<ReactRouterBindings>().basePath("/api");

// Sub-routes:
api.route("/", guestBook);

export { api };
