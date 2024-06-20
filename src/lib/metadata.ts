const ROUTE = Symbol();
const ENV = Symbol();

export interface Metadata {
    [ROUTE]?: {
        pattern: URLPattern;
        method: string;
    } | undefined;
    [ENV]?: Map<any, any> | undefined;
}

export class MetadataManager {
    constructor(private metadata: Metadata | DecoratorMetadataObject | null) {}

    get #metadata() {
        return (this.metadata ??= {} as Metadata) as Metadata;
    }

    get route() {
        return (this.#metadata[ROUTE] ??= {} as { pattern: URLPattern; method: string });
    }

    get environment() {
        return this.#metadata[ENV]!;
    }

    set environment(newValue) {
        this.#metadata[ENV] = newValue;
    }
}
