export interface Constructor<T> {
    new (): T;
}

export interface Handler {
    execute(): Promise<Response>;
}

const ROUTE = Symbol();
const CTX = Symbol();

class Server {
    #handlers = new Map<{ pathname: string }, Handler>();
    #environment = new Map<any, any>();

    get #routes(): Map<URLPattern, Handler> {
        return Array.from(this.#handlers)
            .reduce((routes, [input, handler]) => {
                const pattern = new URLPattern(input);
                routes.set(pattern, handler);
                return routes;
            }, new Map<URLPattern, Handler>());
    }

    #handle = async (request: Request) => {
        for (const [pattern, handler] of this.#routes) {
            const metadata = Object.getPrototypeOf(handler)[Symbol.metadata];

            if (metadata[ROUTE].method === request.method) {
                const result = pattern.exec(request.url);

                if (result) {
                    metadata[CTX] = {
                        request,
                        params: result.pathname.groups,
                        environment: this.#environment,
                    } as Context;

                    return await handler.execute();
                }
            }
        }

        return new Response(null, { status: 404 });
    };

    #registerHandler(handler: Handler) {
        const metadata = Object.getPrototypeOf(handler)[Symbol.metadata];
        this.#handlers.set(
            metadata[ROUTE].input as { pathname: string },
            handler,
        );
    }

    register(handlers: Handler[]): this {
        for (const handler of handlers) {
            this.#registerHandler(handler);
        }

        return this;
    }

    environment<T extends Record<string | symbol, any>>(object: T): this {
        this.#environment.set(Object.getPrototypeOf(object), object);
        return this;
    }

    listen() {
        Deno.serve(this.#handle);
    }
}

/** The parameters that were parsed from the URL path. */
export type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};

interface Context {
    request: Request;
    params: Params;
    environment?: Map<any, any>;
}

new Server()
    .register([
        // new SearchHandler(),
        // new AirDateHandler(),
        // new SubscriptionHandler(),
        // new Handler('/', () => new Response('Hello, world!')),
    ])
    .environment(new Database())
    .listen();

// @route('/search')
// export class SearchResponder implements Responder {
//     @environment(Database)
//     private accessor db!: Database;

//     async execute() {
//         return Response.json(this.db.get('foo'));
//     }
// }

import * as v from 'npm:valibot@0.33.3';

const kv = await Deno.openKv();

// const signUpRoute = defineRoute({
//     path: '/sign-up/:id',
//     get: {
//         async handler({ request, params }) {
//             // params.id could be typesafe based on `path`
//             console.log(params.id);
//             console.log(request.searchParams.get('q'));

//             return Response.json(await kv.get(params.id));
//         },
//     },
//     post: {
//         accept: ['form'],
//         input: v.object({
//             email: v.pipe(v.string(), v.email()),
//             recievePromo: v.boolean(),
//         }),
//         async handler({ email, recievePromo }, { request, params }) {
//             console.log(params.id);
//             console.log(request.searchParams.get('q'));

//             await kv.set(email, { email, recievePromo });
//             return Response.json({ success: true });
//         },
//     },
// });

// const server = createServer([signUpRoute]);
// server.listen();

const searchRoute = defineRoute({
    path: '/search',
    async get({ request, params }) {
        const tmdbApiKey = Deno.env.get('TMDB_API_KEY')!;
        const client = new TheMovieDB(tmdbApiKey);
        const q = request.searchParams.get('q');

        const response = await client.searchTv({ query: q });
        return Response.json(
            response.results?.map(({ id, overview, name }) => ({
                id,
                overview,
                name,
            })),
        );
    },
});

const airDatesRoute = defineRoute({
    path: '/air-dates',
    async get({ request, params }) {
        const traktApiKey = Deno.env.get('TRAKT_CLIENT_ID')!;
        const client = new Trakt(traktApiKey);
        const id = request.searchParams.get('q');

        const response = await client.airDates({ showId: id });
        return Response.json(response);
    },
});

const subscribeRoute = defineRoute({
    path: '/subscribe',
    post: {
        accept: ['form'],
        input: v.object({ id: v.number() }),
        async handler({ id }, { request, params }) {
            const subs = await kv.get<string[]>(['subscriptions']);
            await kv.set(['subscriptions'], [...subs.value!, id]);
            return Response.json({ success: true });
        },
    },
});

const server = createServer([searchRoute, airDatesRoute, subscribeRoute]);
server.listen();
