const ROUTE = Symbol();
const ENV = Symbol();

export interface Metadata {
    [ROUTE]?: {
        pattern: URLPattern;
        method: string;
    } | undefined;
    [ENV]?:
        // deno-lint-ignore ban-types
        | Map<Function, Record<PropertyKey, any>>
        | undefined;
}

export class MetadataManager {
    private readonly metadata: Metadata;

    public constructor(metadata: Metadata | DecoratorMetadataObject | null) {
        this.metadata = (metadata ??= {} as Metadata) as Metadata;
    }

    get route() {
        return (this.metadata[ROUTE] ??= {} as { pattern: URLPattern; method: string });
    }

    get environment() {
        return this.metadata[ENV]!;
    }

    set environment(newValue) {
        this.metadata[ENV] = newValue;
    }
}
