import { TheMovieDB } from '../mod.ts';

export type TheMovieDBSearchTVResults = Awaited<ReturnType<typeof TheMovieDB.prototype.searchTV>>;
