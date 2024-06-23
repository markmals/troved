/** The parameters that were parsed from the URL path. */
export type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};

export interface HandlerOptions {
    request: Request;
    urlParams: Params;
}

export abstract class Handler {
    public readonly request: Request;
    public readonly params: Params;

    public constructor(options: HandlerOptions) {
        this.request = options.request;
        this.params = options.urlParams;
    }

    public abstract respond(): Promise<Response>;
}
