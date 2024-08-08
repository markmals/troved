import { TheMovieDB } from '~/services/mod.ts';

export type TheMovieDBSearchTVResults = Awaited<ReturnType<typeof TheMovieDB.prototype.searchTV>>;
