import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';

const t = initTRPC.meta<OpenApiMeta>().create();

export const trpc = {
    router: t.router,
    procedure: t.procedure,
};
