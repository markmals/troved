import { Handler } from '@web/server';
import { Metadata } from './metadata.ts';

export interface HandlerConstructor {
    new (request: Request, params: Record<string, string | undefined>): Handler;
    [Symbol.metadata]: Metadata | null;
}

export type ClassDecorator<HostCtor, TransformedCtor = HostCtor> = (
    Ctor: HostCtor,
    context: ClassDecoratorContext,
) => TransformedCtor | void;

export type ClassAccessorDecorator<Host, Value> = (
    value: ClassAccessorDecoratorTarget<Host, Value>,
    context: ClassAccessorDecoratorContext<Host, Value>,
) => ClassAccessorDecoratorResult<Host, Value>;
