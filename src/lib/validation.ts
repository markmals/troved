import { parseWithZod } from 'conform';
import { type Route, z } from '~/lib/mod.ts';

export function validateSearchParams(route: Route, request: Request) {
    let url = new URL(request.url);
    let searchParamsSchema = route.searchParams?.schema;

    return searchParamsSchema
        ? parseWithZod(url.searchParams, { schema: z.object(searchParamsSchema) }).value
        : url.searchParams;
}

export async function validateBody(route: Route, request: Request) {
    let body: any;

    switch (route.body?.accept) {
        case 'formData': {
            body = parseWithZod(await request.formData(), { schema: route.body.schema }).value;
            break;
        }
        case 'json': {
            body = (route.body.schema as z.ZodType).parse(await request.json());
            break;
        }
        case 'text': {
            body = await request.text();
            break;
        }
        case 'arrayBuffer': {
            body = await request.arrayBuffer();
            break;
        }
        case 'blob': {
            body = await request.blob();
            break;
        }
        case 'bytes':
        default: {
            body = await request.bytes();
        }
    }

    return body;
}
