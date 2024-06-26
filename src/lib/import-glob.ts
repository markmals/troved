import { walkSync } from '@std/fs';
import { globToRegExp } from '@std/path';

export interface ImportGlobOptions<Key extends string> {
    /** Import only the specific named export. Set to `default` to import the default export. */
    import?: Key;
}

type Selector<Module, Key> = Key extends keyof Module ? Module[Key] : Module;

/** Import a list of files with a glob pattern. */
export function globImport<Module, Key extends string>(
    glob: string,
    { import: namedImport }: ImportGlobOptions<Key> = {},
): Record<string, () => Promise<Selector<Module, Key>>> {
    let pathComponents = glob.split('/');
    let directory = `${pathComponents[0]}/`;
    let g = pathComponents.slice(1).join('/');

    let globRegex = globToRegExp(g, { globstar: true });
    let walker = walkSync(directory, { match: [globRegex] });

    return Array.from(walker).reduce((accumulator, currentValue) => {
        if (namedImport) {
            accumulator[currentValue.path] = async () => {
                let module = await import(`../../${currentValue.path}`);
                return module[namedImport];
            };
            return accumulator;
        }

        accumulator[currentValue.path] = () => import(`../../${currentValue.path}`);
        return accumulator;
    }, {} as Record<string, () => Promise<Selector<Module, Key>>>);
}
