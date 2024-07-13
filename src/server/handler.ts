import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from './context.ts';
import { appRouter } from '../routers/app.ts';

export function handler(request: Request): Promise<Response> {
    return fetchRequestHandler({
        endpoint: '/trpc',
        req: request,
        router: appRouter,
        createContext,
    });
}
