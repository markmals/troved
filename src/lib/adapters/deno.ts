import { Server } from '~/lib/mod.ts';

export function createDenoAdapter(options: Deno.ServeOptions = {}) {
    let server: Deno.HttpServer<Deno.NetAddr> | undefined;

    return {
        async listen(handle: Server.Handler) {
            server = Deno.serve(options, handle);
            return await server.finished;
        },

        get address() {
            return server?.addr;
        },

        async [Symbol.asyncDispose]() {
            await server?.shutdown();
        },
    };
}
