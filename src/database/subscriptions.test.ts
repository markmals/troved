import { beforeEach, describe, expect, it, vi } from "vitest";

// In-memory store for testing
interface Subscription {
    id: number;
    seriesId: number;
    seriesName: string;
    posterPath: string | null;
    firstAirDate: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const inMemoryStore: Map<number, Subscription> = new Map();
let nextId = 1;

// Mock the database module
vi.mock("./mod.ts", () => ({
    db: {
        insert: vi.fn(),
        select: vi.fn(),
        delete: vi.fn(),
    },
}));

import { db } from "./mod.ts";
// Import the actual functions to test
import {
    getAllSubscriptions,
    getSubscription,
    isSeriesSubscribed,
    subscribeToSeries,
    unsubscribeFromAllSeries,
    unsubscribeFromSeries,
} from "./subscriptions.ts";

// Get the mocked db instance with proper typing
const mockDb = vi.mocked(db) as {
    insert: ReturnType<typeof vi.fn>;
    select: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
};

beforeEach(() => {
    vi.clearAllMocks();
    // Reset in-memory store
    inMemoryStore.clear();
    nextId = 1;

    // Set up consistent insert mock that adds to store
    const mockInsert = {
        values: vi.fn().mockImplementation((values: Partial<Subscription>) => {
            const subscription: Subscription = {
                id: nextId++,
                seriesId: values.seriesId!,
                seriesName: values.seriesName!,
                posterPath: values.posterPath || null,
                firstAirDate: values.firstAirDate || null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            inMemoryStore.set(subscription.seriesId, subscription);
            return Promise.resolve(undefined);
        }),
    };

    mockDb.insert.mockReturnValue(mockInsert);
});

describe("subscriptions", () => {
    it("subscribe and fetch", async () => {
        // Subscribe to a series
        await subscribeToSeries(1, { name: "Test Series" });

        // Verify it was stored in our in-memory store
        expect(inMemoryStore.size).toBe(1);
        const storedSub = inMemoryStore.get(1);
        expect(storedSub?.seriesName).toBe("Test Series");
        expect(storedSub?.seriesId).toBe(1);

        // Mock getAllSubscriptions to return the actual store contents
        mockDb.select.mockImplementation(() => ({
            from: () => Promise.resolve(Array.from(inMemoryStore.values())),
        }));

        const all = await getAllSubscriptions();
        expect(all.length).toBe(1);
        expect(all[0].seriesName).toBe("Test Series");

        // Mock getSubscription to return matching subscription
        mockDb.select.mockImplementation(() => ({
            from: () => ({
                where: () => {
                    const sub = inMemoryStore.get(1);
                    return Promise.resolve(sub ? [sub] : []);
                },
            }),
        }));

        const sub = await getSubscription(1);
        expect(sub?.seriesId).toBe(1);

        // Mock isSeriesSubscribed to return matching results
        mockDb.select.mockImplementation(() => ({
            from: () => ({
                where: () => {
                    const sub = inMemoryStore.get(1);
                    return Promise.resolve(sub ? [{ id: sub.id }] : []);
                },
            }),
        }));

        expect(await isSeriesSubscribed(1)).toBe(true);
    });

    it("unsubscribe single", async () => {
        // Subscribe first
        await subscribeToSeries(1, { name: "Test" });
        expect(inMemoryStore.size).toBe(1);

        // Mock delete to actually remove from store
        mockDb.delete.mockImplementation(() => ({
            where: vi.fn().mockImplementation(() => {
                inMemoryStore.delete(1);
                return Promise.resolve(undefined);
            }),
        }));

        await unsubscribeFromSeries(1);
        expect(inMemoryStore.size).toBe(0);

        // Mock isSeriesSubscribed to return empty results
        mockDb.select.mockImplementation(() => ({
            from: () => ({
                where: () => Promise.resolve([]),
            }),
        }));

        expect(await isSeriesSubscribed(1)).toBe(false);
    });

    it("unsubscribe all", async () => {
        // Subscribe to multiple series
        await subscribeToSeries(1, { name: "Test" });
        await subscribeToSeries(2, { name: "Another" });
        expect(inMemoryStore.size).toBe(2);

        // Mock delete all to clear store
        mockDb.delete.mockImplementation(() => {
            inMemoryStore.clear();
            return Promise.resolve(undefined);
        });

        await unsubscribeFromAllSeries();
        expect(inMemoryStore.size).toBe(0);

        // Mock getAllSubscriptions to return empty store
        mockDb.select.mockImplementation(() => ({
            from: () => Promise.resolve(Array.from(inMemoryStore.values())),
        }));

        const all = await getAllSubscriptions();
        expect(all.length).toBe(0);
    });
});
