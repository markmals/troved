import { walk } from '@std/fs';
import { globToRegExp } from '@std/path';
import { Route } from '~/lib/mod.ts';
import { validateBody, validateSearchParams } from '~/lib/validation.ts';

async function globImport<T = any>(pattern: string): Promise<T[]> {
    let pathComponents = pattern.split('/');
    let directory = `${pathComponents[0]}/`;
    let glob = pathComponents.slice(1).join('/');

    let globRegex = globToRegExp(glob, { globstar: true });
    let walker = walk(directory, { match: [globRegex] });

    let imports = [];

    for await (let file of walker) {
        let i = await import(`../../${file.path}`);
        imports.push(i);
    }

    return imports;
}

export async function createServer({ adapter, routesGlob = './src/routes/**/*.ts' }: Server.Options) {
    let routes = (await globImport<{ default: Route }>(routesGlob)).map((module) => module.default);

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
