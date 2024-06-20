// TODO: switch to zod
// import * as v from 'npm:valibot@0.33.3';

// const kv = await Deno.openKv();

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

// const searchRoute = defineRoute({
//     path: '/search',
//     async get({ request, params }) {
//         const tmdbApiKey = Deno.env.get('TMDB_API_KEY')!;
//         const client = new TheMovieDB(tmdbApiKey);
//         const q = request.searchParams.get('q');

//         const response = await client.searchTv({ query: q });
//         return Response.json(
//             response.results?.map(({ id, overview, name }) => ({
//                 id,
//                 overview,
//                 name,
//             })),
//         );
//     },
// });

// const airDatesRoute = defineRoute({
//     path: '/air-dates',
//     async get({ request, params }) {
//         const traktApiKey = Deno.env.get('TRAKT_CLIENT_ID')!;
//         const client = new Trakt(traktApiKey);
//         const id = request.searchParams.get('q');

//         const response = await client.airDates({ showId: id });
//         return Response.json(response);
//     },
// });

// const subscribeRoute = defineRoute({
//     path: '/subscribe',
//     post: {
//         accept: ['form'],
//         input: v.object({ id: v.number() }),
//         async handler({ id }, { request, params }) {
//             const subs = await kv.get<string[]>(['subscriptions']);
//             await kv.set(['subscriptions'], [...subs.value!, id]);
//             return Response.json({ success: true });
//         },
//     },
// });

// const server = createServer([searchRoute, airDatesRoute, subscribeRoute]);
// server.listen();
