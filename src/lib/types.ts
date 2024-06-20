export type ClassDecorator<HostCtor, TransformedCtor = HostCtor> = (
    Ctor: HostCtor,
    context: ClassDecoratorContext,
) => TransformedCtor | void;

export type ClassAccessorDecorator<Host, Value> = (
    value: ClassAccessorDecoratorTarget<Host, Value>,
    context: ClassAccessorDecoratorContext<Host, Value>,
) => ClassAccessorDecoratorResult<Host, Value>;

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
