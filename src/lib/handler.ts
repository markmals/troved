/** The parameters that were parsed from the URL path. */
export type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};

export abstract class Handler {
    public constructor(public request: Request, public params: Params) {}
    public abstract respond(): Promise<Response>;
}
