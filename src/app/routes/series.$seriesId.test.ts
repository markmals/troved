import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Route } from "./+types/series.$seriesId";
import { action, loader } from "./series.$seriesId.tsx";

// Mock services and db
vi.mock("$api/services/mod.ts", () => ({
    tmdb: { getSeriesDetails: vi.fn() },
}));
vi.mock("$db/subscriptions.ts", () => ({
    isSeriesSubscribed: vi.fn(),
    subscribeToSeries: vi.fn(),
    unsubscribeFromSeries: vi.fn(),
}));

import { tmdb } from "$api/services/mod.ts";
import { isSeriesSubscribed, subscribeToSeries, unsubscribeFromSeries } from "$db/subscriptions.ts";

function createRequest(intent: string) {
    return new Request("http://localhost", {
        method: "POST",
        body: new URLSearchParams({ intent }),
    });
}

describe("series.$seriesId route", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("loader returns series and subscription state", async () => {
        (tmdb.getSeriesDetails as unknown as vi.Mock).mockResolvedValue({
            name: "Test",
        });
        (isSeriesSubscribed as unknown as vi.Mock).mockResolvedValue(true);

        const result = await loader({ params: { seriesId: "1" } } as Route.LoaderArgs);
        expect(result.series.name).toBe("Test");
        expect(result.isSubscribed).toBe(true);
    });

    it("action subscribes and redirects", async () => {
        (tmdb.getSeriesDetails as unknown as vi.Mock).mockResolvedValue({
            name: "Test",
        });
        const response = await action({
            request: createRequest("subscribe"),
            params: { seriesId: "1" },
        } as Route.ActionArgs);
        expect(subscribeToSeries).toHaveBeenCalled();
        expect(response instanceof Response && response.headers.get("Location")).toBe(
            "/subscriptions",
        );
    });

    it("action unsubscribes", async () => {
        await action({
            request: createRequest("unsubscribe"),
            params: { seriesId: "1" },
        } as Route.ActionArgs);
        expect(unsubscribeFromSeries).toHaveBeenCalledWith(1);
    });
});
