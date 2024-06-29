import { RouteModule } from '~/lib/mod.ts';
import { validateBody, validateSearchParams } from '~/lib/validation.ts';
import { globImport } from './import-glob.ts';

export async function createServer({ adapter, routesGlob = './src/routes/**/*.ts' }: Server.Options): Promise<Server> {
    // FIXME: The second generic argument should be able to be inferred from `import`
    let routeImports = globImport<RouteModule, 'default'>(routesGlob, {
        import: 'default',
    });
    let routes = await Promise.all(
        Object.entries(routeImports).map(async ([, route]) => await route()),
    );

    const handler = async (request: Request) => {
        // Get the first matching route
        let match = routes
            .map((route) => {
                let result = route.pattern.exec(request.url);

                return {
                    route,
                    urlMatchesRequest: result !== null,
                    get urlParams() {
                        if (result === null) {
                            throw new Error('Cannot get URL parameters for non-matching URL');
                        }

                        return result.pathname.groups;
                    },
                };
            })
            .filter(({ urlMatchesRequest }) => urlMatchesRequest)
            .filter(({ route }) => route.method === request.method)
            .sort((lhs, rhs) => lhs.route.path.localeCompare(rhs.route.path))[0];

        // No matching route found
        if (!match) return new Response(null, { status: 404 });

        return await match.route.handler({
            request,
            // TODO: Validate URL Params
            urlParams: match.urlParams,
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

export interface Server {
    listen(): Promise<void>;
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
