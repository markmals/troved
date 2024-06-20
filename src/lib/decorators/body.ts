import { Handler } from '../handler.ts';
import { makeRequestAccessorDecorator } from './request-accessor.ts';
import { ClassAccessorDecorator } from '../types.ts';

export function body<Host extends Handler>(type: 'arrayBuffer'): ClassAccessorDecorator<Host, Promise<ArrayBuffer>>;
export function body<Host extends Handler>(type: 'blob'): ClassAccessorDecorator<Host, Promise<Blob>>;
export function body<Host extends Handler>(type: 'bytes'): ClassAccessorDecorator<Host, Promise<Uint8Array>>;
export function body<Host extends Handler>(type: 'formData'): ClassAccessorDecorator<Host, Promise<FormData>>;
export function body<Host extends Handler, Data>(type: 'json'): ClassAccessorDecorator<Host, Promise<Data>>;
export function body<Host extends Handler>(type: 'text'): ClassAccessorDecorator<Host, Promise<string>>;
export function body<Host extends Handler>(
    type: 'blob' | 'bytes' | 'arrayBuffer' | 'text' | 'json' | 'formData',
): ClassAccessorDecorator<Host, Promise<any>> {
    return makeRequestAccessorDecorator('body', function (propertyName) {
        return this.request[type]();
    });
}

// TODO: Validation using Zod & Conform
// https://conform.guide/api/zod/parseWithZod
//
// {
//     accept: ['form'],
//     input: z.object({ id: z.number() }),
//     async handler({ id }, { request, params }) {
//         const subs = await kv.get<string[]>(['subscriptions']);
//         await kv.set(['subscriptions'], [...subs.value!, id]);
//         return Response.json({ success: true });
//     },
// }
