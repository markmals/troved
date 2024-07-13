import '@std/dotenv/load';
import { handler } from './server/handler.ts';

Deno.serve(handler);
