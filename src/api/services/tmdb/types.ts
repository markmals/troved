import type { tmdb } from "./client.ts";

export type TheMovieDBSearchTVResults = Awaited<ReturnType<typeof tmdb.searchTV>>;
