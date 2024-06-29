import { Route, z } from '~/lib/mod.ts';

export function createRoute<
    Path extends string,
    URLSearchParamsSchema extends Record<string, z.ZodType> | any = any,
    //deno-lint-ignore ban-types
    BodySchema extends z.ZodType | {} = {},
>(
    route: Route<Path, URLSearchParamsSchema, BodySchema>,
): Route<Path, URLSearchParamsSchema, BodySchema> & { pattern: URLPattern } {
    return { ...route, pattern: new URLPattern({ pathname: route.path }) };
}

export type RouteModule = { default: Route & { pattern: URLPattern } };
