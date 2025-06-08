import openapiTS, { astToString } from "openapi-typescript";

// biome-ignore lint/nursery/noSecrets: Not a secret
const response = await fetch("https://developer.themoviedb.org/openapi/64542913e1f86100738e227f");
const typeDefinitions = astToString(await openapiTS(JSON.parse(await response.text())));
await Deno.writeTextFile("./src/server/services/tmdb/api/types.ts", typeDefinitions);
