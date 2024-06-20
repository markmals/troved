import { HandlerConstructor } from './handler.ts';
import { MetadataManager } from './metadata.ts';

export class Server {
    #routes = new Map<URLPattern, HandlerConstructor>();
    #environment = new Map<any, any>();

    #handler = async (request: Request) => {
        for (const [pattern, HandlerClass] of this.#routes) {
            // Get the metadata for the route handler
            const metadata = new MetadataManager(HandlerClass[Symbol.metadata]);

            // Find a route matching the current method
            if (metadata.route.method === request.method) {
                // Does the handler's route pattern match the current URL?
                const result = pattern.exec(request.url);
                if (result) {
                    // Pass the environment to the handler
                    metadata.environment = this.#environment;
                    // Create and invoke the handler
                    const handler = new HandlerClass(request, result.pathname.groups);
                    return await handler.respond();
                }
            }
        }

        // No matching route found
        return new Response(null, { status: 404 });
    };

    register(handlers: HandlerConstructor[]): this {
        for (const HandlerClass of handlers) {
            const metadata = new MetadataManager(HandlerClass[Symbol.metadata]);
            this.#routes.set(metadata.route.pattern, HandlerClass);
        }

        return this;
    }

    environment<T extends Record<string | symbol, any>>(object: T): this {
        this.#environment.set(object.constructor, object);
        return this;
    }

    listen() {
        return Deno.serve(this.#handler);
    }
}
