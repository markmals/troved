export interface Constructor<T> {
    new (): T;
}

export interface Executable<T> {
    execute(): Promise<T>;
}

export interface Responder extends Executable<Response> {
}
