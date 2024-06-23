import { MetadataManager } from './metadata.ts';
import { HandlerConstructor } from '~/lib/private-types.ts';

export class Server {
    #routes: HandlerConstructor[] = [];
    // deno-lint-ignore ban-types
    #environment = new Map<Function, Record<PropertyKey, any>>();

    #handler = async (request: Request) => {
        for (const Route of this.#routes) {
            // Get the metadata for the route handler
            const metadata = new MetadataManager(Route[Symbol.metadata]);

            // Find a route matching the current method
            if (metadata.route.method === request.method) {
                // Does the handler's route pattern match the current URL?
                const result = metadata.route.pattern.exec(request.url);
                if (result) {
                    // Pass the environment to the handler
                    metadata.environment = this.#environment;
                    // Create and invoke the handler
                    const routeHandler = new Route(request, result.pathname.groups);
                    return await routeHandler.respond();
                }
            }
        }

        // No matching route found
        return new Response(null, { status: 404 });
    };

    register(handlers: HandlerConstructor[]): this {
        this.#routes = [...this.#routes.filter((route) => handlers.includes(route)), ...handlers];
        return this;
    }

    environment<T extends Record<PropertyKey, any>>(object: T): this {
        this.#environment.set(object.constructor, object);
        return this;
    }

    listen() {
        return Deno.serve(this.#handler);
    }
}
