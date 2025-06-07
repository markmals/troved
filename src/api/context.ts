import { AsyncLocalStorage } from "node:async_hooks";
import type { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";

export class Context<Value> {
    #storage = new AsyncLocalStorage<Value>();
    #defaultValue?: Value;

    constructor(defaultValue?: Value) {
        this.#defaultValue = defaultValue;
    }

    provide(value: Value): MiddlewareHandler {
        return createMiddleware((_, next) => this.#storage.run(value, next));
    }

    static get<Value>(ctx: Context<Value>): Value {
        const value = ctx.#storage.getStore() ?? ctx.#defaultValue;
        if (!value) throw new Error(`No value found for context ${ctx.constructor.name}`);
        return value;
    }
}

export const KvContext = new Context<Deno.Kv>();
