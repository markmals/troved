import { Router, withParams } from 'router';
import { SearchResponder } from './responders/search-responder.ts';
import { AirDateResponder } from './responders/air-date-responder.ts';
import { SubscriptionResponder } from './responders/subscription-responder.ts';
import { respondWith } from './lib/routing.ts';
import 'std/dotenv/load.ts';

const router = Router();

router
    .all('*', withParams)
    .get('/search', respondWith(SearchResponder))
    .get('/air-dates', respondWith(AirDateResponder))
    .post('/subscribe', respondWith(SubscriptionResponder))
    .get('/', () => new Response('Hello, world!'));

// class TroveRouter extends Router {
//     static responders = [
//         new SearchResponder(),
//         new AirDateResponder(),
//         new SubscriptionResponder(),
//         new Responder('/', () => new Response('Hello, world!'))
//     ]
// }
//
// TroveRouter.listen()

// await new Server()
//     .register([
//         new SearchHandler(),
//         new AirDateHandler(),
//         new SubscriptionHandler(),
//         new Handler('/', () => new Response('Hello, world!')),
//     ])
//     .environment(new Database())
//     .listen()

// @route('/search')
// export class SearchResponder implements Responder {
//     @environment(Database)
//     private accessor db!: Database;

//     async execute() {
//         return Response.json(this.db.get('foo'));
//     }
// }

Deno.serve(router.handle);
