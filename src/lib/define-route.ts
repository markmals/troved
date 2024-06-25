import { Route, z } from '~/lib/mod.ts';

export function defineRoute<
    Path extends string,
    URLSearchParamsSchema extends Record<string, z.ZodType> | any = any,
    //deno-lint-ignore ban-types
    BodySchema extends z.ZodType | {} = {},
>(
    route: Route<Path, URLSearchParamsSchema, BodySchema>,
): Route<Path, URLSearchParamsSchema, BodySchema> {
    return route;
}
