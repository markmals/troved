import yaml from 'yaml';

await Deno.writeTextFile(
    './src/def.ts',
    `export const definition = ${
        JSON.stringify(
            yaml.parse(await Deno.readTextFile('./openapi.yaml')),
            null,
            4,
        )
    }`,
);
