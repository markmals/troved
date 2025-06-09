import { DatabaseSync } from "node:sqlite";
import { drizzle } from "@mizchi/drizzle-orm/dist/node-sqlite/index.js";
import { GuestBook, Subscriptions } from "./schema.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
if (!DATABASE_URL) {
    throw new Error("Must define DATABASE_URL in .env file");
}

const client = new DatabaseSync(DATABASE_URL);
export const db = drizzle(client, {
    schema: { guestBook: GuestBook, subscriptions: Subscriptions },
});
