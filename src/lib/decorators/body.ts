import { Handler } from '../handler.ts';
import { makeRequestAccessorDecorator } from './request-accessor.ts';
import { ClassAccessorDecorator } from '../private-types.ts';
import { parseWithZod } from 'npm:@conform-to/zod@1.1.5';
import z from 'npm:zod@3.23.8';

export function body<Host extends Handler>(
    options: { accept: 'arrayBuffer' },
): ClassAccessorDecorator<Host, Promise<ArrayBuffer>>;
export function body<Host extends Handler>(options: { accept: 'blob' }): ClassAccessorDecorator<Host, Promise<Blob>>;
export function body<Host extends Handler>(
    options: { accept: 'bytes' },
): ClassAccessorDecorator<Host, Promise<Uint8Array>>;
export function body<Host extends Handler>(
    options: { accept: 'formData'; input: z.ZodType },
): ClassAccessorDecorator<Host, Promise<z.infer<typeof options.input>>>;
export function body<Host extends Handler>(
    options: { accept: 'json'; input: z.ZodType },
): ClassAccessorDecorator<Host, Promise<z.infer<typeof options.input>>>;
export function body<Host extends Handler>(options: { accept: 'text' }): ClassAccessorDecorator<Host, Promise<string>>;
export function body<Host extends Handler>(
    { accept, input: schema }: {
        accept: 'blob' | 'bytes' | 'arrayBuffer' | 'text' | 'json' | 'formData';
        input?: z.ZodType;
    },
): ClassAccessorDecorator<Host, Promise<any>> {
    return makeRequestAccessorDecorator(arguments.callee.name, function () {
        return (async () => {
            switch (accept) {
                case 'formData':
                case 'json': {
                    const data = await this.request[accept]();
                    const submission = parseWithZod(data, { schema });
                    return submission;
                }
                default: {
                    return await this.request[accept]();
                }
            }
        })();
    });
}

export type BodyData<Schema extends z.ZodType> = Promise<z.infer<Schema>>;
