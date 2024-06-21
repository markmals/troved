import { Handler } from '../handler.ts';
import { ClassAccessorDecorator } from '../private-types.ts';

export function makeRequestAccessorDecorator<Host extends Handler, Value>(
    name: string,
    action: (this: Host, name: string) => Value,
): ClassAccessorDecorator<Host, Value> {
    return (_target, context) => {
        if (context.static) {
            throw new TypeError(`@${name}() can only be applied to instance members.`);
        }

        return {
            get() {
                if (typeof context.name === 'symbol') {
                    throw new TypeError(`@${name}() cannot be applied to symbol-named properties.`);
                }

                return action.call(this, context.name);
            },
        };
    };
}
