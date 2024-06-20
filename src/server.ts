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

Deno.serve(router.handle);
