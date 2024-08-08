import { parseArgs } from '@std/cli/parse-args';
import openapiTS, { astToString } from 'openapi-typescript';
import type { OpenAPI3 } from 'openapi-typescript';
import spec from './spec.ts';

async function generateOpenApiDefinition() {
    await Deno.writeTextFile(
        `./src/api/${spec.info.title.toLowerCase()}-v${spec.info.version}.json`,
        JSON.stringify(spec, null, 4),
    );
}

async function generateTypeDefinitions() {
    const typeDefinitions = astToString(await openapiTS(spec as OpenAPI3));
    await Deno.writeTextFile('./src/api/types.ts', typeDefinitions);
}

const flags = parseArgs(Deno.args, {
    boolean: ['openapi-only', 'types-only'],
});

if (!flags['types-only']) {
    await generateOpenApiDefinition();
}

if (!flags['openapi-only']) {
    await generateTypeDefinitions();
}
