import { Handler } from '../handler.ts';
import { makeRequestAccessorDecorator } from './request-accessor.ts';
import { ClassAccessorDecorator } from '../types.ts';

export function searchParam<Host extends Handler>(): ClassAccessorDecorator<Host, string> {
    return makeRequestAccessorDecorator('searchParam', function (propertyName) {
        const searchParams = new URL(this.request.url).searchParams;
        return searchParams.get(propertyName)!;
    });
}

// TODO: Validation using Zod & Conform
// https://conform.guide/api/zod/parseWithZod
