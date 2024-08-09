import '@std/dotenv/load';
import api from '~/api/app.ts';

Deno.serve(api.fetch);
