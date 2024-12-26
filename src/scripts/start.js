import { serve } from "@hono/node-server";
import server from "../../build/server/index.js";

if (process.env.NODE_ENV !== "production") {
    console.error("Must be run in production.");
    process.exit(1);
}

const PORT = Number.parseInt(process.env.PORT || "4321");

console.log("Starting production server...");

serve({
    port: PORT,
    fetch: server.fetch,
});

console.log(`Server is running on http://localhost:${PORT}`);
