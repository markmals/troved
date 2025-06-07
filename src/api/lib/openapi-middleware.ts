import type { MiddlewareOnRequest } from "openapi-fetch";

export interface Middleware {
    onRequest: MiddlewareOnRequest;
}
