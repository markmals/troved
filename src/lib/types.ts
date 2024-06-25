import { z } from '~/lib/mod.ts';

export const HttpMethod = {
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
    Patch: 'PATCH',
    Delete: 'DELETE',
};

export const ContentType = {
    /** The JSON content type. */
    Json: 'application/json',
    /** The XML content type. */
    Xml: 'application/xml',
    /** The Form Encoded content type. */
    UrlEncoded: 'application/x-www-form-urlencoded',
};

export type Range = [lowerBound: number, upperBound: number];

export class StatusError extends Error {
    public constructor(public response: Response) {
        super();
    }

    public get cause() {
        return this.response.statusText;
    }
}

type ExtractURLParam<Path, NextPart> = Path extends `:${infer Param}` ? Record<Param, string> & NextPart : NextPart;

export type URLParams<Path> = Path extends `${infer Segment}/${infer Rest}` ? ExtractURLParam<Segment, URLParams<Rest>>
    // deno-lint-ignore ban-types
    : ExtractURLParam<Path, {}>;

export type HandlerInit<
    URLParamKey extends string,
    // FIXME: Why does this work with `| any = any` but not `| never = never`?
    URLSearchParamsSchema extends Record<string, z.ZodType> | any = any,
    // FIXME: Why does this work with `| {} = {}` but not `| any = any` or `| never = never`?
    //deno-lint-ignore ban-types
    BodySchema extends z.ZodType | {} = {},
> = {
    request: Request;
    urlParams: URLParams<URLParamKey>;
    searchParams: URLSearchParamsSchema extends Record<string, z.ZodType> ? z.infer<z.ZodObject<URLSearchParamsSchema>>
        : URLSearchParams;
    body: BodySchema extends z.ZodType ? z.infer<BodySchema> : Uint8Array;
};

export type Route<
    Path extends string = string,
    URLSearchParamsSchema extends Record<string, z.ZodType> | any = any,
    //deno-lint-ignore ban-types
    BodySchema extends z.ZodType | {} = {},
> = {
    path: Path;
    method: string;

    searchParams?: {
        schema: URLSearchParamsSchema;
    };

    body?: {
        accept: 'blob' | 'bytes' | 'arrayBuffer' | 'text' | 'json' | 'formData';
        schema?: BodySchema;
    };

    handler(handlerInit: HandlerInit<Path, URLSearchParamsSchema, BodySchema>): Promise<Response>;
};
