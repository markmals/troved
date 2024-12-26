import { defineConfig } from "vite";

import honoDevServer, { defaultOptions } from "@hono/vite-dev-server";
import nodeAdapter from "@hono/vite-dev-server/node";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactCompiler } from "./react-compiler.plugin";

const SERVER_ENTRY = "./src/server/index.ts";

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [
        reactRouter(),
        reactCompiler(),
        tailwindcss(),
        honoDevServer({
            entry: SERVER_ENTRY,
            adapter: nodeAdapter,
            exclude: [...defaultOptions.exclude, "/assets/**", "/src/**"],
            injectClientScript: false,
        }),
        tsconfigPaths(),
    ],
    build: {
        target: "ES2022",
        rollupOptions: isSsrBuild ? { input: SERVER_ENTRY } : undefined,
    },
    server: {
        port: Number.parseInt(process.env.PORT || "4321"),
        // fs: { allow: ["src/app"] },
    },
}));
