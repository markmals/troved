import type { HandlerConstructor } from '../handler.ts';
import { MetadataManager } from '../metadata.ts';
import type { ClassDecorator } from './types.ts';

/** A class decorator that denotes a class as a resource for a given path and HTTP method */
export function resource<HandlerClass extends HandlerConstructor>(
    pathname: string,
    method: string,
): ClassDecorator<HandlerClass> {
    return (This, _context) => {
        const metadata = new MetadataManager(This[Symbol.metadata]);
        metadata.route.pattern = new URLPattern({ pathname });
        metadata.route.method = method;
    };
}
