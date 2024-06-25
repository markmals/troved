import { Server } from '@web/server';
import 'fetch-event-adapter';

export class ServiceWorkerAdapter implements Server.Adapter, Disposable {
    private handle?: Server.HandlerClosure;

    private readonly listener = async (event: FetchEvent) => {
        event.respondWith(await this.handle!(event.request));
    };

    public listen(handle: Server.HandlerClosure) {
        this.handle = handle;
        self.addEventListener('fetch', this.listener);
    }

    public [Symbol.dispose]() {
        self.removeEventListener('fetch' as any, this.listener);
    }
}
