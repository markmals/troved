import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export function createContext({
    req: request,
    resHeaders: headers,
}: FetchCreateContextFnOptions) {
    // const user = { name: request.headers.get('username') ?? 'anonymous' };
    // return { request, headers, user };
    return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
