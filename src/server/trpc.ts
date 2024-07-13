import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';

export const trpc = initTRPC.meta<OpenApiMeta>().create();
