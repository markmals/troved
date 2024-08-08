/**
 * The description of OpenAPI v3.1.x documents without schema validation, as defined by
 * https://spec.openapis.org/oas/v3.1.0
 */
export interface OpenAPISpec {
    components?: Components;
    externalDocs?: ExternalDocs;
    info: Info;
    jsonSchemaDialect?: string;
    openapi: string;
    paths?: Paths;
    security?: { [key: string]: string[] }[];
    servers?: ServerElement[];
    tags?: TagElement[];
    webhooks?: { [key: string]: any };
    [property: string]: any;
}

export function defineSpec(spec: OpenAPISpec): OpenAPISpec {
    return spec;
}

export interface Paths {
    [path: `/${string}`]: {
        $ref?: string;
        summary?: string;
        description?: string;
        get?: Operation;
        put?: Operation;
        post?: Operation;
        delete?: Operation;
        options?: Operation;
        head?: Operation;
        patch?: Operation;
        trace?: Operation;
        parameters?: Parameter[];
    };
}

export interface Operation {
    tags?: string[];
    summary?: string;
    description?: string;
    operationId: string;
    parameters?: Parameter[];
    requestBody?: RequestBody;
    responses?: Record<`${number}`, OperationResponse>;
}

export interface OperationResponse {
    description?: string;
    // headers?: Record<string, OperationHeader>
    content: Content;
    // links?: Record<string, Link>
}

export type Parameter = {
    name: string;
    in: 'query' | 'header' | 'cookie';
    description?: string;
    /** @default false */
    required?: boolean;
    schema: Schema;
} | {
    name: string;
    in: 'path';
    description?: string;
    required: true;
    schema: Schema;
};

export interface RequestBody {
    description?: string;
    content: Content;
    /** @default false */
    required?: boolean;
}

export type Content = Partial<Record<MIMEType, { schema: Schema }>>;

interface Schema {
    $id?: string;
    $schema?: string;
    $ref?: string;
    title?: string;
    description?: string;
    default?: any;
    examples?: any[];
    type?: SchemaType | SchemaType[];
    enum?: any[];
    const?: any;

    // Number-specific properties
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;

    // String-specific properties
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    format?: string;

    // Array-specific properties
    items?: Schema | Schema[];
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;

    // Object-specific properties
    properties?: {
        [key: string]: Schema;
    };
    required?: boolean;
    additionalProperties?: boolean | Schema;
    maxProperties?: number;
    minProperties?: number;
    patternProperties?: {
        [key: string]: Schema;
    };
    dependencies?: {
        [key: string]: Schema | string[];
    };
    propertyNames?: Schema;

    // Conditional properties
    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    not?: Schema;
    if?: Schema;
    then?: Schema;
    else?: Schema;

    // Definitions
    definitions?: {
        [key: string]: Schema;
    };
}

type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';

type MIMEType =
    | 'application/json'
    | 'application/javascript'
    | 'application/xml'
    | 'application/pdf'
    | 'application/zip'
    | 'application/x-www-form-urlencoded'
    | 'application/octet-stream'
    | 'application/vnd.api+json'
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'application/vnd.ms-powerpoint'
    | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/x-www-form-urlencoded'
    | 'audio/mpeg'
    | 'audio/ogg'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/webp'
    | 'text/css'
    | 'text/html'
    | 'text/plain'
    | 'text/csv'
    | 'text/xml'
    | 'text/javascript'
    | 'video/mp4'
    | 'video/mpeg'
    | 'video/ogg'
    | 'video/webm'
    | 'multipart/form-data';

type SemVer = `${number}.${number}.${number}` | `${number}.${number}` | `${number}`;

export interface Components {
    callbacks?: { [key: string]: any };
    examples?: { [key: string]: any };
    headers?: { [key: string]: any };
    links?: { [key: string]: any };
    parameters?: { [key: string]: any };
    pathItems?: { [key: string]: any };
    requestBodies?: { [key: string]: any };
    responses?: { [key: string]: any };
    schemas?: { [key: string]: any };
    securitySchemes?: { [key: string]: any };
    [property: string]: any;
}

export interface ExternalDocs {
    description?: string;
    url: string;
    [property: string]: any;
}

export interface Info {
    contact?: Contact;
    description?: string;
    license?: License;
    summary?: string;
    termsOfService?: string;
    title: string;
    version: SemVer;
    [property: string]: any;
}

export interface Contact {
    email?: string;
    name?: string;
    url?: string;
    [property: string]: any;
}

export interface License {
    identifier?: string;
    name: string;
    url?: string;
    [property: string]: any;
}

export interface ServerElement {
    description?: string;
    url: string;
    variables?: { [key: string]: VariableValue };
    [property: string]: any;
}

export interface VariableValue {
    default: string;
    description?: string;
    enum?: string[];
    [property: string]: any;
}

export interface TagElement {
    description?: string;
    externalDocs?: ExternalDocs;
    name: string;
    [property: string]: any;
}
