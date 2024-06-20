export type ClassDecorator<HostCtor, TransformedCtor = HostCtor> = (
    Ctor: HostCtor,
    context: ClassDecoratorContext,
) => TransformedCtor | void;

export type ClassAccessorDecorator<Host, Value> = (
    value: ClassAccessorDecoratorTarget<Host, Value>,
    context: ClassAccessorDecoratorContext<Host, Value>,
) => ClassAccessorDecoratorResult<Host, Value>;
