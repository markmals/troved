import { Handler } from '../handler.ts';
import { makeRequestAccessorDecorator } from './request-accessor.ts';
import { ClassAccessorDecorator } from '../private-types.ts';

export function searchParam<Host extends Handler>(): ClassAccessorDecorator<Host, string> {
    return makeRequestAccessorDecorator('searchParam', function (propertyName) {
        let url = new URL(this.request.url);
        return url.searchParams.get(propertyName)!;
    });
}

// TODO: Validation using Zod & Conform
// https://conform.guide/api/zod/parseWithZod
