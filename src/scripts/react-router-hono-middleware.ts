import { serveDir, serveFile } from "@std/http/file-server";
import { join } from "@std/path";
import { createMiddleware } from "hono/factory";
import type { RequestHandler } from "react-router";

export const reactRouter = (handler: RequestHandler) =>
    createMiddleware(async (c) => {
        const pathname = new URL(c.req.url).pathname;

        try {
            const filePath = join("./build/client", pathname);
            const fileInfo = await Deno.stat(filePath);

            if (fileInfo.isDirectory) {
                throw new Deno.errors.NotFound();
            }

            // The request is for a static file that exists

            if (pathname.startsWith("/assets/")) {
                return serveDir(c.req.raw, {
                    fsRoot: "build/client/assets",
                    urlRoot: "assets",
                    headers: ["Cache-Control: public, max-age=31536000, immutable"],
                });
            }

            const response = await serveFile(c.req.raw, filePath, { fileInfo });
            response.headers.set("Cache-Control", "public, max-age=600");
            return response;
        } catch (error) {
            if (!(error instanceof Deno.errors.NotFound)) {
                throw error;
            }
        }

        return await handler(c.req.raw);
    });
