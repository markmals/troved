import { MetadataManager } from './metadata.ts';
import { HandlerConstructor } from '~/lib/private-types.ts';

export class Server {
    private routes: HandlerConstructor[] = [];
    // deno-lint-ignore ban-types
    private environmentStorage = new Map<Function, Record<PropertyKey, any>>();

    private handler = async (request: Request) => {
        for (const Route of this.routes) {
            // Get the metadata for the route handler
            let metadata = new MetadataManager(Route[Symbol.metadata]);

            // Find a route matching the current method
            if (metadata.route.method === request.method) {
                // Does the handler's route pattern match the current URL?
                let result = metadata.route.pattern.exec(request.url);
                if (result) {
                    // Pass the environment to the handler
                    metadata.environment = this.environmentStorage;
                    // Create and invoke the handler
                    let routeHandler = new Route(request, result.pathname.groups);
                    return await routeHandler.respond();
                }
            }
        }

        // No matching route found
        return new Response(null, { status: 404 });
    };

    public register(handlers: HandlerConstructor[]): this {
        this.routes = [...this.routes.filter((route) => handlers.includes(route)), ...handlers];
        return this;
    }

    public environment<T extends Record<PropertyKey, any>>(object: T): this {
        this.environmentStorage.set(object.constructor, object);
        return this;
    }

    public listen() {
        return Deno.serve(this.handler);
    }
}
