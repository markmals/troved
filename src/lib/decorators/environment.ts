import { Handler } from '../handler.ts';
import { MetadataManager } from '../metadata.ts';
import type { ClassAccessorDecorator } from './types.ts';

/** An accessor decorator that enables resources to access shared state */
export function environment<ObjectClass, T extends Record<string | symbol, any>>(
    Object: ObjectClass,
): ClassAccessorDecorator<Handler, T> {
    return (_accessor, context) => {
        return {
            get() {
                const metadata = new MetadataManager(context.metadata);
                return metadata.environment.get(Object);
            },
        };
    };
}
