import { Server } from '@webstd/server';
import { AirDateHandler, SearchHandler, SubscriptionHandler } from '~/handlers/mod.ts';

import 'std/dotenv/load.ts';

new Server()
    .register([
        // new Group('/foo', [
        //     FooHandler,
        //     BarHandler,
        //     // /foo/baz
        //     new Group('/baz', [
        //         BazHandler,
        //         BaxHandler,
        //     ])
        //         .environment(new BaxClient()),
        // ])
        //     .environment(new BarClient()),
        SearchHandler,
        AirDateHandler,
        SubscriptionHandler,
    ])
    // .environment(new Database())
    .listen();
