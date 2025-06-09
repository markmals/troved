import { DatabaseSync } from "node:sqlite";
import { join } from "@std/path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

let db: typeof import("./mod.ts").db;
let funcs: typeof import("./subscriptions.ts");
const TEST_DB = join(Deno.cwd(), "test.sqlite");

beforeAll(async () => {
    try {
        await Deno.remove(TEST_DB);
    } catch {
        // ignore
    }
    const { drizzle } = await import("@mizchi/drizzle-orm/dist/node-sqlite/index.js");
    const { GuestBook, Subscriptions } = await import("./schema.ts");
    const client = new DatabaseSync(TEST_DB);
    db = drizzle(client, { schema: { guestBook: GuestBook, subscriptions: Subscriptions } });
    vi.mock("./mod.ts", () => ({ db }));
    db.$client.exec(`CREATE TABLE subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        series_id INTEGER NOT NULL UNIQUE,
        series_name TEXT NOT NULL,
        poster_path TEXT,
        first_air_date TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
    );`);
    funcs = await import("./subscriptions.ts");
});

beforeEach(() => {
    db.$client.exec("DELETE FROM subscriptions;");
});

afterAll(() => {
    db.$client.close();
    try {
        Deno.removeSync(TEST_DB);
    } catch {
        // ignore
    }
});

describe("subscriptions", () => {
    it("subscribe and fetch", async () => {
        await funcs.subscribeToSeries(1, { name: "Test" });
        const all = await funcs.getAllSubscriptions();
        expect(all.length).toBe(1);
        expect(all[0].seriesName).toBe("Test");
        expect(await funcs.isSeriesSubscribed(1)).toBe(true);
        const sub = await funcs.getSubscription(1);
        expect(sub?.seriesId).toBe(1);
    });

    it("unsubscribe single", async () => {
        await funcs.subscribeToSeries(1, { name: "Test" });
        await funcs.unsubscribeFromSeries(1);
        expect(await funcs.isSeriesSubscribed(1)).toBe(false);
    });

    it("unsubscribe all", async () => {
        await funcs.subscribeToSeries(1, { name: "Test" });
        await funcs.subscribeToSeries(2, { name: "Another" });
        await funcs.unsubscribeFromAllSeries();
        const all = await funcs.getAllSubscriptions();
        expect(all.length).toBe(0);
    });
});
