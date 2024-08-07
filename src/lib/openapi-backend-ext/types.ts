import { Context, Handler, ParsedRequest } from 'openapi-backend';

export function json<Data>(data: Data, init?: ResponseInit): TypedResponse<Data> {
    return Response.json(data, init);
}

export type TypedResponse<T = unknown> = Omit<Response, 'json'> & {
    json(): Promise<T>;
};

type Operation = {
    parameters?: {
        path?: any;
        query?: any;
    };
    responses: Record<string, any>;
};

type OperationPath<T> = T extends {
    parameters?: {
        path?: infer U;
    };
} ? U
    : never;

type OperationQuery<T> = T extends {
    parameters?: {
        query?: infer U;
    };
} ? U
    : never;

type OperationBody<T> = T extends {
    requestBody?: {
        content?: {
            'application/json': infer U;
        };
    };
} ? U
    : never;

type JsonResponse<T> = T extends {
    content?: {
        'application/json': infer U;
    };
} ? U
    : any;

type OperationResponse<T> = T extends {
    responses?: Record<string, infer U>;
} ? JsonResponse<
        Extract<U, {
            content: any;
        }>
    >
    : any;

interface ExtendedRequest<
    TParams extends Record<string, string | string[]>,
    TQuery extends Record<string, string | string[]>,
    TBody,
> extends ParsedRequest {
    params: TParams;
    cookies: {
        [key: string]: string | string[];
    };
    query: TQuery;
    requestBody: TBody;
    body: TBody;
}

interface ExtendedContext<
    TParams extends Record<string, string | string[]>,
    TQuery extends Record<string, string | string[]>,
    TBody,
    TResponse,
> extends Context {
    request: ExtendedRequest<TParams, TQuery, TBody>;
    response: TypedResponse<TResponse>;
}

type ExtendedHandler<
    TParams extends Record<string, string | string[]>,
    TQuery extends Record<string, string | string[]>,
    TBody,
    TResponse,
> = (
    context: ExtendedContext<TParams, TQuery, TBody, TResponse>,
    request: Request,
    response: TypedResponse<TResponse>,
) => TypedResponse<TResponse> | Promise<TypedResponse<TResponse>>;

export type OperationHandler<T> = T extends Operation
    ? ExtendedHandler<OperationPath<T>, OperationQuery<T>, OperationBody<T>, OperationResponse<T>>
    : any;

export type Handlers<T> = {
    [Property in keyof T]: OperationHandler<T[Property]>;
};

export function defineHandler<TOperation>(handler: OperationHandler<TOperation>): OperationHandler<TOperation> {
    return handler as any;
}

export function defineHandlers<TOperations>(handlers: Handlers<TOperations>): Record<string, Handler> {
    return handlers as any;
}
