import { Server } from '~/lib/server.ts';
import { AirDateHandler, SearchHandler, SubscriptionHandler } from '~/handlers/mod.ts';

import 'std/dotenv/load.ts';

new Server()
    .register([
        SearchHandler,
        AirDateHandler,
        SubscriptionHandler,
    ])
    // .environment(new Database())
    .listen();
