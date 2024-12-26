import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { reactRouter } from "remix-hono/handler";
import invariant from "tiny-invariant";
import { openKv } from "@deno/kv";
import api from "./api/api";
import { KvContext } from "./context";

import "react-router";
declare module "react-router" {
    interface AppLoadContext {
        VALUE_FROM_HONO: string;
    }
}

invariant(process.env.DATABASE_URL, "Must define DATABASE_URL in .env file");

const server: Hono = new Hono();

const kv = await openKv(process.env.DATABASE_URL);
server.use(KvContext.provide(kv));

// MARK: Register sub-routes
server.route("/", api);

if (import.meta.env.PROD) {
    server.use("*", serveStatic({ root: "./build/client" }));
}

server.use(
    "*",
    reactRouter({
        // @ts-expect-error - virtual module provided by React Router at build time
        // eslint-disable-next-line import/no-unresolved
        build: () => import("virtual:react-router/server-build"),
        mode: process.env.NODE_ENV as "production" | "development",
        getLoadContext: () => ({
            VALUE_FROM_HONO: "Hello from Hono",
        }),
    }),
);

export default server;
