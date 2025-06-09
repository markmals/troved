import { beforeEach, describe, expect, it, vi } from "vitest";
import { type MockRecord, setupDrizzleMocks } from "./test-utils.ts";

// Mock the database module
vi.mock("./mod.ts", () => ({
    db: {
        insert: vi.fn(),
        select: vi.fn(),
        delete: vi.fn(),
    },
}));

import * as db from "./mod.ts";
// Import the actual functions to test
import {
    getAllSubscriptions,
    getSubscription,
    isSeriesSubscribed,
    subscribeToSeries,
    unsubscribeFromAllSeries,
    unsubscribeFromSeries,
} from "./subscriptions.ts";

interface Subscription extends MockRecord {
    id: number;
    seriesId: number;
    seriesName: string;
    posterPath: string | null;
    firstAirDate: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// One-liner setup with all defaults
const { store, mock } = setupDrizzleMocks<Subscription>(db);

beforeEach(() => {
    vi.clearAllMocks();
    store.clear();

    mock.setupInsert((values: Partial<Subscription>) => ({
        id: store.size + 1,
        seriesId: values.seriesId!,
        seriesName: values.seriesName!,
        posterPath: values.posterPath || null,
        firstAirDate: values.firstAirDate || null,
        createdAt: new Date(),
        updatedAt: new Date(),
    }));
});

describe("subscriptions", () => {
    it("subscribe and fetch", async () => {
        // Subscribe to a series
        await subscribeToSeries(1, { name: "Test Series" });

        // Verify it was stored in our store
        expect(store.size).toBe(1);
        const storedSub = store.findByKey(1);
        expect(storedSub?.seriesName).toBe("Test Series");
        expect(storedSub?.seriesId).toBe(1);

        const all = await getAllSubscriptions();
        expect(all.length).toBe(1);
        expect(all[0].seriesName).toBe("Test Series");

        mock.setupSelectWhere(() => {
            const sub = store.findByKey(1);
            return sub ? [sub] : [];
        });

        const sub = await getSubscription(1);
        expect(sub?.seriesId).toBe(1);

        mock.setupSelectWhere(() => {
            const sub = store.findByKey(1);
            return sub ? [{ id: sub.id }] : [];
        });

        expect(await isSeriesSubscribed(1)).toBe(true);
    });

    it("unsubscribe single", async () => {
        // Subscribe first
        await subscribeToSeries(1, { name: "Test" });
        expect(store.size).toBe(1);

        mock.setupDeleteWhere(() => {
            store.deleteByKey(1);
        });

        await unsubscribeFromSeries(1);
        expect(store.size).toBe(0);

        expect(await isSeriesSubscribed(1)).toBe(false);
    });

    it("unsubscribe all", async () => {
        // Subscribe to multiple series
        await subscribeToSeries(1, { name: "Test" });
        await subscribeToSeries(2, { name: "Another" });
        expect(store.size).toBe(2);

        await unsubscribeFromAllSeries();
        expect(store.size).toBe(0);

        const all = await getAllSubscriptions();
        expect(all.length).toBe(0);
    });
});
