import "jsr:@std/dotenv/load";
import { DatabaseSync } from "node:sqlite";
import { drizzle } from "@mizchi/drizzle-orm/dist/node-sqlite/index.js";
import { assert } from "@std/assert";
import { GuestBook } from "./schema.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
assert(DATABASE_URL, "Must define DATABASE_URL in .env file");

const client = new DatabaseSync(DATABASE_URL);
export const db = drizzle(client, { schema: { guestBook: GuestBook } });
