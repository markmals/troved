import { ofetch } from "ofetch";
import type z from "zod";

export function createFetcher(method: string) {
    return async <Schema extends z.Schema = z.ZodUndefined>(
        input: Parameters<typeof ofetch>[0],
        init?: Parameters<typeof ofetch>[1] & { schema?: Schema },
    ): Promise<Schema extends undefined ? undefined : z.infer<Schema>> => {
        const { schema, ...options } = init || {};
        const response = await ofetch(
            input,
            { ...options, method: method } as Parameters<typeof ofetch>[1],
        );
        return schema?.parse(response);
    };
}

export const get = createFetcher("GET");
export const post = createFetcher("POST");
export const put = createFetcher("PUT");
export const patch = createFetcher("PATCH");
export const del = createFetcher("DELETE");
