import { Server } from '@web/server';
import { DenoAdapter } from '~/lib/adapters/deno-adapter.ts';
import { AirDateHandler, SearchHandler, SubscriptionHandler } from '~/handlers/mod.ts';

import '@std/dotenv/load';

await new Server({ adapter: new DenoAdapter() })
    .register([
        SearchHandler,
        AirDateHandler,
        SubscriptionHandler,
    ])
    .listen();
