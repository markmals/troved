import { integer, sqliteTable, text } from "@mizchi/drizzle-orm/dist/sqlite-core/index.js";

export const GuestBook = sqliteTable("guest_book", {
    id: integer().primaryKey(),
    name: text({ length: 255 }).notNull(),
    email: text({ length: 255 }).notNull().unique(),
});
