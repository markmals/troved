import { Handler } from '../handler.ts';
import { makeRequestAccessorDecorator } from './request-accessor.ts';
import { ClassAccessorDecorator } from '../private-types.ts';

export function urlParam<Host extends Handler>(): ClassAccessorDecorator<Host, string> {
    return makeRequestAccessorDecorator('urlParam', function (property) {
        return this.params[property.name]!;
    });
}
