import { createDenoAdapter, createServer } from '@web/server';
import '@std/dotenv/load';

let adapter = createDenoAdapter();
let server = await createServer({ adapter });

await server.listen();
