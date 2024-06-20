import { IRequest, RouteHandler } from 'router';
import { Constructor, Responder } from './interfaces.ts';

const REQUEST = Symbol();

export function respondWith(
    ResponderCtor: Constructor<Responder>,
): RouteHandler<any, []> {
    const responder = new ResponderCtor();

    return async (request) => {
        setRequest(request, ResponderCtor);
        return await responder.execute();
    };
}

export function setRequest(request: IRequest, ResponderCtor: Constructor<Responder>) {
    (ResponderCtor[Symbol.metadata] ??= {})[REQUEST] = request;
}

type ClassAccessorDecorator<Host, Value> = (
    _target: ClassAccessorDecoratorTarget<Host, Value>,
    context: ClassAccessorDecoratorContext<Host, Value>,
) => ClassAccessorDecoratorResult<Host, Value>;

function makeRequestAccessorDecorator<Host, Value>(
    name: string,
    key: keyof IRequest,
): ClassAccessorDecorator<Host, Value> {
    return (_target, context) => {
        if (context.static) {
            throw new Error(
                `@${name}() can only be applied to instance members.`,
            );
        }

        return {
            get() {
                if (typeof context.name === 'symbol') {
                    throw new Error(
                        `@${name}() cannot be applied to symbol-named properties.`,
                    );
                }

                const request = context.metadata[REQUEST]! as IRequest;
                return request[key][context.name] as Value;
            },
        };
    };
}

export function query<Host>() {
    return makeRequestAccessorDecorator<Host, string>('query', 'query');
}

export function param<Host>() {
    return makeRequestAccessorDecorator<Host, string>('param', 'params');
}

export function body<Host>(type: 'text'): ClassAccessorDecorator<Host, Promise<string>>;
export function body<Host, Data>(type: 'json'): ClassAccessorDecorator<Host, Promise<Data>>;
export function body<Host>(type: 'formData'): ClassAccessorDecorator<Host, Promise<FormData>>;
export function body<Host>(
    type: 'blob' | 'bytes' | 'arrayBuffer' | 'text' | 'json' | 'formData',
): ClassAccessorDecorator<Host, Promise<any>> {
    return (_target, context) => {
        if (context.static) {
            throw new Error(
                `@body() can only be applied to instance members.`,
            );
        }

        return {
            get() {
                if (typeof context.name === 'symbol') {
                    throw new Error(
                        `@body() cannot be applied to symbol-named properties.`,
                    );
                }

                const request = context.metadata[REQUEST]! as IRequest;
                return request[type]();
            },
        };
    };
}
