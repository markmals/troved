import { Handler } from '../handler.ts';
import { makeRequestAccessorDecorator } from './request-accessor.ts';
import { ClassAccessorDecorator } from '../private-types.ts';

export function searchParam<Host extends Handler>(): ClassAccessorDecorator<Host, string> {
    return makeRequestAccessorDecorator(arguments.callee.name, function (property) {
        const url = new URL(this.request.url);
        return url.searchParams.get(property.name)!;
    });
}
