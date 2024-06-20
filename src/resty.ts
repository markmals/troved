export enum Method {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
}

export enum ContentType {
    /** The JSON content type. */
    Json = 'application/json',
    /** The XML content type. */
    Xml = 'application/xml',
    /** The Form Encoded content type. */
    UrlEncoded = 'application/x-www-form-urlencoded',
}

export type Range = [lowerBound: number, upperBound: number];

export class RequestBuilder {
    private requestInit: RequestInit & { headers: Headers } = {
        headers: new Headers(),
    };

    private statusCode: Range = [200, 300];

    public constructor(method: string, private url: URL) {
        this.requestInit.method = method;
    }

    /** Adds the Accept content type to the request. */
    public accept(contentType: ContentType): RequestBuilder {
        this.requestInit.headers.set('Accept', contentType);
        return this;
    }

    /** Adds the Content-Type to the request. */
    public contentType(contentType: ContentType): RequestBuilder {
        this.requestInit.headers.set('Content-Type', contentType);
        return this;
    }

    /** Adds the body data to the request. */
    public body(data: BodyInit): RequestBuilder {
        this.requestInit.body = data;
        return this;
    }

    /** Encodes the object as JSON and adds it as the body to the request. */
    public encodeBody<T extends object>(data: T): RequestBuilder {
        this.requestInit.body = JSON.stringify(data);
        return this;
    }

    /** Adds the headers to the request. */
    public headers(
        headers: Record<string, string> | Map<string, string> | Headers,
    ): RequestBuilder {
        let iteratable = (headers instanceof Map || headers instanceof Headers)
            ? headers.entries()
            : Object.entries(headers);

        for (let [key, value] of iteratable) {
            this.requestInit.headers.set(key, value);
        }

        return this;
    }

    /** Adds the header to the request. */
    public header(key: string, value: string): RequestBuilder {
        this.requestInit.headers.set(key, value);
        return this;
    }

    /** Adds the expected status code to the request. */
    public expectedStatusCode(range: Range): RequestBuilder {
        this.statusCode = range;
        return this;
    }

    /** Adds the search parameter to the request. */
    public searchParam(key: string, value: string): RequestBuilder {
        this.url.searchParams.set(key, value);
        return this;
    }

    /** Adds the search parameters to the request. */
    public searchParams(
        query: URLSearchParams | Record<string, string | undefined>,
    ): RequestBuilder {
        for (
            let [key, value] of query instanceof URLSearchParams
                ? query
                : Object.entries(query)
        ) {
            if (value) this.url.searchParams.set(key, value);
        }
        return this;
    }

    public async fetch(): Promise<Response> {
        let response = await fetch(this.url, this.requestInit);
        let [lower, upper] = this.statusCode;
        let badStatus = response.status < lower || response.status > upper;

        if (!response.ok || badStatus) {
            throw new StatusError(response);
        }

        return response;
    }

    public async fetchJson<T>(): Promise<T> {
        this.accept(ContentType.Json);
        let response = await this.fetch();
        return await response.json();
    }

    public async fetchText(): Promise<string> {
        let response = await this.fetch();
        return await response.text();
    }

    public async fetchFormData(): Promise<FormData> {
        this.accept(ContentType.UrlEncoded);
        let response = await this.fetch();
        return await response.formData();
    }
}

export class StatusError extends Error {
    public constructor(public response: Response) {
        super();
    }

    public get cause() {
        return this.response.statusText;
    }
}

export abstract class API {
    protected abstract readonly baseUrl: string;

    private buildUrl(path: string) {
        return new URL(`${this.baseUrl}/${path}`);
    }

    private buildRequestBuilder(method: string, path: string) {
        return new RequestBuilder(method, this.buildUrl(path));
    }

    protected get(path: string) {
        return this.buildRequestBuilder(Method.Get, path);
    }

    protected post(path: string) {
        return this.buildRequestBuilder(Method.Post, path);
    }

    protected put(path: string) {
        return this.buildRequestBuilder(Method.Put, path);
    }

    protected patch(path: string) {
        return this.buildRequestBuilder(Method.Patch, path);
    }

    protected delete(path: string) {
        return this.buildRequestBuilder(Method.Delete, path);
    }
}
