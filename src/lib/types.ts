export enum HttpMethod {
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

export class StatusError extends Error {
    public constructor(public response: Response) {
        super();
    }

    public get cause() {
        return this.response.statusText;
    }
}
