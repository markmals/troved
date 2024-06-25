import { Server } from '@web/server';

export class DenoAdapter implements Server.Adapter, AsyncDisposable {
    private server?: Deno.HttpServer<Deno.NetAddr>;

    public get address() {
        return this.server?.addr;
    }

    public constructor(private options: Deno.ServeOptions = {}) {}

    public async listen(handle: Server.HandlerClosure) {
        this.server = Deno.serve(this.options, handle);
        return await this.server.finished;
    }

    public async [Symbol.asyncDispose]() {
        await this.server?.shutdown();
    }
}
