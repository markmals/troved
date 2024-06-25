import { walk } from '@std/fs';
import { globToRegExp } from '@std/path';
import { parseWithZod } from 'conform';
import { Route, z } from '~/lib/mod.ts';

async function importGlob<T = any>(pattern: string): Promise<T[]> {
    let glob = globToRegExp(pattern);
    let walker = walk('.', { match: [glob] });

    let imports = [];

    for await (let file of walker) {
        let i = await import(file.path);
        imports.push(i);
    }

    return imports;
}

function validateSearchParams(route: Route, request: Request) {
    let url = new URL(request.url);
    let searchParamsSchema = route.searchParams?.schema;

    return searchParamsSchema
        ? parseWithZod(url.searchParams, { schema: z.object(searchParamsSchema) })
        : url.searchParams;
}

async function validateBody(route: Route, request: Request) {
    let body: any;

    switch (route.body?.accept) {
        case 'formData': {
            body = parseWithZod(await request.formData(), { schema: route.body.schema });
            break;
        }
        case 'json': {
            body = (route.body.schema as z.ZodType).parse(await request.json());
            break;
        }
        case 'text': {
            body = await request.text();
            break;
        }
        case 'arrayBuffer': {
            body = await request.arrayBuffer();
            break;
        }
        case 'blob': {
            body = await request.blob();
            break;
        }
        case 'bytes':
        default: {
            body = await request.bytes();
        }
    }

    return body;
}

export async function createServer({ adapter, routesGlob = './src/routes/**/*.ts' }: Server.Options) {
    let routes = (await importGlob<{ default: Route }>(routesGlob)).map((module) => module.default);

    const handler = async (request: Request) => {
        // Get the first matching route
        let match = routes
            .filter((route) => route.method === request.method)
            .map((route) => {
                let pattern = new URLPattern({ pathname: route.path });
                let result = pattern.exec(request.url);
                return { route, result };
            })
            .filter(({ result }) => result !== null)
            .sort((lhs, rhs) => lhs.route.path.localeCompare(rhs.route.path))[0];

        // No matching route found
        if (!match) return new Response(null, { status: 404 });

        return await match.route.handler({
            request,
            urlParams: match.result!.pathname.groups,
            searchParams: validateSearchParams(match.route, request),
            body: await validateBody(match.route, request),
        });
    };

    return {
        async listen() {
            return await adapter.listen(handler);
        },
    };
}

export namespace Server {
    export interface Options {
        adapter: Adapter;
        routesGlob?: string;
    }

    export interface Adapter {
        listen(handler: Server.Handler): Promise<void> | void;
    }

    export type Handler = (request: Request) => Promise<Response>;
}
