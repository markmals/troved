import openapiTS, { astToString } from "openapi-typescript";
import * as fs from "node:fs/promises";

const response = await fetch("https://developer.themoviedb.org/openapi/64542913e1f86100738e227f");
const typeDefinitions = astToString(await openapiTS(JSON.parse(await response.text())));
await fs.writeFile("./src/server/services/tmdb/api/types.ts", typeDefinitions);
