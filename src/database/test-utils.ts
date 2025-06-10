import { vi } from "vitest";

/**
 * Utilities for mocking Drizzle ORM in tests
 *
 * Simplest usage (one-liner setup):
 * ```ts
 * import * as dbModule from "./mod.ts";
 * vi.mock("./mod.ts", () => ({ db: { insert: vi.fn(), select: vi.fn(), delete: vi.fn() } }));
 *
 * const { store: userStore, mock: drizzleMock } = setupDrizzleMocks<User>(dbModule);
 *
 * beforeEach(() => {
 *   userStore.clear();
 *   drizzleMock.setupInsert((values) => ({ ...values, id: Date.now() }));
 * });
 *
 * // Override defaults only when needed in tests
 * drizzleMock.setupSelectWhere(() => userStore.findByKey(userId) ? [user] : []);
 * ```
 *
 * Alternative setup (more explicit):
 * ```ts
 * const userStore = new DrizzleMockStore<User>();
 * const drizzleMock = createDrizzleMockWithDefaults(userStore, dbModule);
 * ```
 *
 * Advanced usage with full control:
 * ```ts
 * const userStore = new DrizzleMockStore<User>();
 * const drizzleMock = createDrizzleMock(userStore);
 * const mockDb = vi.mocked(db);
 * drizzleMock.initializeWith(mockDb);
 * // Set up all behaviors manually...
 * ```
 */

export interface MockRecord {
    id: number;
    [key: string]: unknown;
}

export class DrizzleMockStore<T extends MockRecord> {
    private store: Map<number, T> = new Map();
    private nextId = 1;
    private idField: keyof T;

    constructor(idField: keyof T = "id" as keyof T) {
        this.idField = idField;
    }

    clear() {
        this.store.clear();
        this.nextId = 1;
    }

    insert(values: Partial<T>): T {
        const record = {
            ...values,
            [this.idField]: this.nextId++,
        } as T;

        // Use seriesId as key if available, otherwise use id
        const key =
            ((values as Record<string, unknown>).seriesId as number) ||
            (record[this.idField] as number);
        this.store.set(key, record);
        return record;
    }

    findByKey(key: number): T | undefined {
        return this.store.get(key);
    }

    findAll(): T[] {
        return Array.from(this.store.values());
    }

    deleteByKey(key: number): boolean {
        return this.store.delete(key);
    }

    deleteAll(): void {
        this.store.clear();
    }

    get size(): number {
        return this.store.size;
    }
}

export type MockDb = {
    insert: { mockImplementation: (...args: unknown[]) => unknown };
    select: { mockImplementation: (...args: unknown[]) => unknown };
    delete: { mockImplementation: (...args: unknown[]) => unknown };
};

export interface DrizzleMockSetup<T extends MockRecord> {
    store: DrizzleMockStore<T>;
    setupInsert: (transformer?: (values: Partial<T>) => T) => void;
    setupSelectAll: (handler?: () => unknown[]) => void;
    setupSelectWhere: (handler?: () => unknown[]) => void;
    setupDeleteWhere: (handler?: () => void) => void;
    setupDeleteAll: (handler?: () => void) => void;
    /** Override the default mocked db - usually not needed */
    initializeWith: (mockedDb: MockDb) => void;
}

/**
 * Complete setup for Drizzle mocking with sensible defaults
 *
 * @param dbModule The mocked database module (from vi.mock)
 * @returns Store and mock setup ready to use
 */
export function setupDrizzleMocks<T extends MockRecord>(dbModule: unknown) {
    const store = new DrizzleMockStore<T>();
    const mock = createDrizzleMockWithDefaults(store, dbModule);
    return { store, mock };
}

/**
 * Create a complete Drizzle mock setup with automatic db mocking
 *
 * @param store The in-memory store for testing
 * @param dbModule The mocked database module (from vi.mock)
 * @returns A fully configured mock setup with sensible defaults
 */
export function createDrizzleMockWithDefaults<T extends MockRecord>(
    store: DrizzleMockStore<T>,
    dbModule: unknown,
): DrizzleMockSetup<T> {
    const mockSetup = createDrizzleMock(store);
    const mockedDb = vi.mocked((dbModule as { db: unknown }).db);

    // Initialize with the mocked db automatically
    mockSetup.initializeWith(mockedDb);

    // Set up default behaviors that work for most cases
    mockSetup.setupSelectAll(); // Uses store.findAll() by default
    mockSetup.setupSelectWhere(); // Returns empty by default
    mockSetup.setupDeleteAll(); // Calls store.deleteAll() by default
    mockSetup.setupDeleteWhere(); // No-op by default

    return mockSetup;
}

export function createDrizzleMock<T extends MockRecord>(
    store: DrizzleMockStore<T>,
): DrizzleMockSetup<T> {
    const mockDb = {
        insert: vi.fn(),
        select: vi.fn(),
        delete: vi.fn(),
    };

    let currentInsertTransformer: ((values: Partial<T>) => T) | undefined;
    let currentSelectAllHandler: (() => unknown[]) | undefined;
    let currentSelectWhereHandler: (() => unknown[]) | undefined;
    let currentDeleteWhereHandler: (() => void) | undefined;
    let currentDeleteAllHandler: (() => void) | undefined;
    let targetMockedDb: MockDb | null = null;

    const setupInsertMock = () => {
        const mockInsert = {
            values: vi.fn().mockImplementation((values: Partial<T>) => {
                if (currentInsertTransformer) {
                    const record = currentInsertTransformer(values);
                    store.insert(record);
                } else {
                    store.insert(values);
                }
                return Promise.resolve(undefined);
            }),
        };
        mockDb.insert.mockReturnValue(mockInsert);
    };

    const setupSelectMock = () => {
        mockDb.select.mockImplementation(() => {
            const fromResult = {
                where: () => {
                    if (currentSelectWhereHandler) {
                        return Promise.resolve(currentSelectWhereHandler());
                    }
                    return Promise.resolve([]);
                },
            };

            // Make fromResult itself a thenable for select all operations
            const selectAllResult = currentSelectAllHandler
                ? currentSelectAllHandler()
                : store.findAll();

            return {
                from: () => {
                    // Return a hybrid object that can be both awaited directly or used with .where()
                    const result = Object.assign(Promise.resolve(selectAllResult), fromResult);
                    return result;
                },
            };
        });
    };

    const setupDeleteMock = () => {
        mockDb.delete.mockImplementation((table?: unknown) => {
            if (table) {
                // This could be either delete all or delete with where
                // Return a hybrid object that can handle both cases
                const deleteAllResult = Promise.resolve(
                    (() => {
                        if (currentDeleteAllHandler) {
                            currentDeleteAllHandler();
                        }
                        return undefined;
                    })(),
                );

                const whereMethod = vi.fn().mockImplementation(() => {
                    if (currentDeleteWhereHandler) {
                        currentDeleteWhereHandler();
                    }
                    return Promise.resolve(undefined);
                });

                // Return a hybrid that can be awaited directly (for delete all) or used with .where()
                return Object.assign(deleteAllResult, {
                    where: whereMethod,
                });
            }

            // This shouldn't happen in normal Drizzle usage, but just in case
            if (currentDeleteAllHandler) {
                currentDeleteAllHandler();
            }
            return Promise.resolve(undefined);
        });
    };

    const applyMocks = () => {
        if (targetMockedDb) {
            setupInsertMock();
            setupSelectMock();
            setupDeleteMock();

            targetMockedDb.insert.mockImplementation(mockDb.insert);
            targetMockedDb.select.mockImplementation(mockDb.select);
            targetMockedDb.delete.mockImplementation(mockDb.delete);
        }
    };

    return {
        store,
        setupInsert: (transformer?: (values: Partial<T>) => T) => {
            currentInsertTransformer = transformer;
            applyMocks();
        },
        setupSelectAll: (handler?: () => unknown[]) => {
            currentSelectAllHandler = handler || (() => store.findAll());
            applyMocks();
        },
        setupSelectWhere: (handler?: () => unknown[]) => {
            currentSelectWhereHandler = handler || (() => []);
            applyMocks();
        },
        setupDeleteWhere: (handler?: () => void) => {
            currentDeleteWhereHandler = handler || (() => {});
            applyMocks();
        },
        setupDeleteAll: (handler?: () => void) => {
            currentDeleteAllHandler = handler || (() => store.deleteAll());
            applyMocks();
        },
        initializeWith: (mockedDb: MockDb) => {
            targetMockedDb = mockedDb;
            applyMocks();
        },
    };
}
