/* eslint-disable no-undef */

import { ofetch } from "ofetch";
import type z from "zod";

export function createFetcher(method: string) {
    return async function <Schema extends z.Schema = z.ZodUndefined>(
        input: RequestInfo,
        init?: Omit<RequestInit, "method"> & { schema?: Schema },
    ): Promise<Schema extends undefined ? undefined : z.infer<Schema>> {
        const response = await ofetch(input, { ...init, method });
        return init?.schema?.parse(response);
    };
}

export const get = createFetcher("GET");
export const post = createFetcher("POST");
export const put = createFetcher("PUT");
export const patch = createFetcher("PATCH");
export const del = createFetcher("DELETE");
