import { Handler } from '../handler.ts';
import { makeRequestAccessorDecorator } from './request-accessor.ts';
import { ClassAccessorDecorator } from '../types.ts';

export function urlParam<Host extends Handler>(): ClassAccessorDecorator<Host, string> {
    return makeRequestAccessorDecorator('urlParam', function (propertyName) {
        return this.params[propertyName]!;
    });
}
