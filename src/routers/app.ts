import { trpc } from '../server/trpc.ts';
import { tvShowsRouter } from './tv-shows.ts';

export const appRouter = trpc.router({
    tvShows: tvShowsRouter,
});

export type AppRouter = typeof appRouter;
