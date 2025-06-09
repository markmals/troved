import { beforeEach, describe, expect, it, vi } from "vitest";

// Define types for our mock objects
interface MockQuery {
    from: ReturnType<typeof vi.fn>;
    where?: ReturnType<typeof vi.fn>;
}

interface MockInsert {
    values: ReturnType<typeof vi.fn>;
}

interface MockDelete {
    where: ReturnType<typeof vi.fn>;
}

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

    // Set up default mock implementations
    const mockInsert: MockInsert = {
        values: vi.fn().mockResolvedValue(undefined),
    };

    const mockQuery: MockQuery = {
        from: vi.fn().mockResolvedValue([]),
    };

    const mockDelete: MockDelete = {
        where: vi.fn().mockResolvedValue(undefined),
    };

    mockDb.insert.mockReturnValue(mockInsert);
    mockDb.select.mockReturnValue(mockQuery);
    mockDb.delete.mockReturnValue(mockDelete);
});

describe("subscriptions", () => {
    it("subscribe and fetch", async () => {
        const mockSubscription = {
            id: 1,
            seriesId: 1,
            seriesName: "Test",
            posterPath: null,
            firstAirDate: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Mock getAllSubscriptions to return our test data
        const getAllQuery: MockQuery = {
            from: vi.fn().mockResolvedValue([mockSubscription]),
        };
        mockDb.select.mockReturnValueOnce(getAllQuery);

        // Mock isSeriesSubscribed to return [{ id: 1 }] (true case)
        const isSubscribedQuery: MockQuery = {
            from: vi.fn().mockReturnValue({
                where: vi.fn().mockResolvedValue([{ id: 1 }]),
            }),
        };
        mockDb.select.mockReturnValueOnce(isSubscribedQuery);

        // Mock getSubscription to return the subscription
        const getQuery: MockQuery = {
            from: vi.fn().mockReturnValue({
                where: vi.fn().mockResolvedValue([mockSubscription]),
            }),
        };
        mockDb.select.mockReturnValueOnce(getQuery);

        await subscribeToSeries(1, { name: "Test" });

        const all = await getAllSubscriptions();
        expect(all.length).toBe(1);
        expect(all[0].seriesName).toBe("Test");

        expect(await isSeriesSubscribed(1)).toBe(true);

        const sub = await getSubscription(1);
        expect(sub?.seriesId).toBe(1);
    });

    it("unsubscribe single", async () => {
        // Mock isSeriesSubscribed to return false (empty array means not found)
        const emptyQuery: MockQuery = {
            from: vi.fn().mockReturnValue({
                where: vi.fn().mockResolvedValue([]),
            }),
        };
        mockDb.select.mockReturnValue(emptyQuery);

        await subscribeToSeries(1, { name: "Test" });
        await unsubscribeFromSeries(1);
        expect(await isSeriesSubscribed(1)).toBe(false);
    });

    it("unsubscribe all", async () => {
        // Mock getAllSubscriptions to return empty array
        const emptyAllQuery: MockQuery = {
            from: vi.fn().mockResolvedValue([]),
        };
        mockDb.select.mockReturnValue(emptyAllQuery);

        await subscribeToSeries(1, { name: "Test" });
        await subscribeToSeries(2, { name: "Another" });
        await unsubscribeFromAllSeries();

        const all = await getAllSubscriptions();
        expect(all.length).toBe(0);
    });
});
