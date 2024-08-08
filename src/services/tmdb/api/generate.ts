import openapiTS, { astToString } from 'openapi-typescript';

const openApi = await fetch('https://developer.themoviedb.org/openapi/64542913e1f86100738e227f')
    .then((r) => r.text());
const typeDefinitions = astToString(await openapiTS(JSON.parse(openApi)));
await Deno.writeTextFile('./src/services/tmdb/api/types.ts', typeDefinitions);
