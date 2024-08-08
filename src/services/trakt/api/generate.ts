import apib2swagger from 'npm:apib2swagger';
import openapiTS, { astToString } from 'npm:openapi-typescript';

interface OpenApiDefinition {
    paths: { [path: string]: { [method: string]: { operationId: string } } };
}

function deduplicate(definition: OpenApiDefinition): OpenApiDefinition {
    let operationIdCounter: Record<string, number> = {};
    const deduplicated: OpenApiDefinition = definition;

    deduplicated.paths = Object.entries(deduplicated.paths).reduce((acc, [pathKey, pathValue]) => {
        const newPathValue = Object.entries(pathValue).reduce((methodAcc, [methodKey, methodValue]) => {
            const operationId = methodValue.operationId;

            if (operationIdCounter[operationId]) {
                const newOperationId = `${operationId} ${operationIdCounter[operationId]}`;
                operationIdCounter[operationId]++;
                methodValue.operationId = newOperationId;
            } else {
                operationIdCounter[operationId] = 1;
            }

            return { ...methodAcc, [methodKey]: methodValue };
        }, {} as OpenApiDefinition['paths'][string]);

        return { ...acc, [pathKey]: newPathValue };
    }, {} as OpenApiDefinition['paths']);

    return deduplicated;
}

function toOpenApi(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
        apib2swagger.convert(
            file,
            { openApi3: true },
            (error: any, result: { swagger: OpenApiDefinition }) => {
                if (error) reject(error);
                if (result) {
                    resolve(JSON.stringify(deduplicate(result.swagger)));
                }
            },
        );
    });
}

const apiBlueprint = await fetch('https://trakt.docs.apiary.io/api-description-document').then((r) => r.text());
const openApi = await toOpenApi(apiBlueprint);
const typeDefinitions = astToString(await openapiTS(openApi));
await Deno.writeTextFile('./src/services/trakt/api/types.ts', typeDefinitions);
