import { Handler } from '../handler.ts';
import { MetadataManager } from '../metadata.ts';
import type { ClassAccessorDecorator } from '../private-types.ts';

/** An accessor decorator that enables resources to access shared state */
// deno-lint-ignore ban-types
export function environment<ObjectClass extends Function, T extends Record<string | symbol, any>>(
    Object: ObjectClass,
): ClassAccessorDecorator<Handler, T> {
    return (_, context) => {
        return { get: () => new MetadataManager(context.metadata).environment.get(Object)! };
    };
}
