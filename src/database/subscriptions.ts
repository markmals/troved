import { eq } from "@mizchi/drizzle-orm/dist/sql/expressions/index.js";
import { db } from "./mod.ts";
import { Subscriptions } from "./schema.ts";

export interface SeriesData {
    name: string;
    posterPath?: string;
    firstAirDate?: string;
}

/** Subscribe to a TV series */
export async function subscribeToSeries(seriesId: number, seriesData: SeriesData) {
    const now = new Date();
    await db.insert(Subscriptions).values({
        seriesId,
        seriesName: seriesData.name,
        posterPath: seriesData.posterPath,
        firstAirDate: seriesData.firstAirDate,
        createdAt: now,
        updatedAt: now,
    });
}

/** Remove a series subscription */
export async function unsubscribeFromSeries(seriesId: number) {
    await db.delete(Subscriptions).where(eq(Subscriptions.seriesId, seriesId));
}

/** Clear all subscriptions */
export async function unsubscribeFromAllSeries() {
    await db.delete(Subscriptions);
}

/** Check if a specific series is subscribed */
export async function getSubscription(seriesId: number) {
    const [row] = await db
        .select()
        .from(Subscriptions)
        .where(eq(Subscriptions.seriesId, seriesId));
    return row ?? null;
}

/** List all subscribed series */
export async function getAllSubscriptions() {
    return await db.select().from(Subscriptions);
}

/** Quick boolean check for UI state */
export async function isSeriesSubscribed(seriesId: number) {
    const [row] = await db
        .select({ id: Subscriptions.id })
        .from(Subscriptions)
        .where(eq(Subscriptions.seriesId, seriesId));
    return row !== undefined;
}
