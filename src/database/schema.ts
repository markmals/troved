import { integer, sqliteTable, text } from "@mizchi/drizzle-orm/dist/sqlite-core/index.js";

export const GuestBook = sqliteTable("guest_book", {
    id: integer().primaryKey(),
    name: text({ length: 255 }).notNull(),
    email: text({ length: 255 }).notNull().unique(),
});

export const Subscriptions = sqliteTable("subscriptions", {
    id: integer().primaryKey({ autoIncrement: true }),
    seriesId: integer("series_id").notNull().unique(),
    seriesName: text("series_name", { length: 255 }).notNull(),
    posterPath: text("poster_path", { length: 255 }),
    firstAirDate: text("first_air_date", { length: 255 }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
