import { kv } from "./mod.ts";

export interface GuestBook {
    id: number;
    name: string;
    email: string;
}

export const GUEST_BOOK = "guest_book";

const ID_COUNTER = "id_counter";
export async function getId() {
    let current = await kv.get<number>([ID_COUNTER]);

    while (true) {
        // If it doesn’t exist, seed it at 0
        if (!current.value) {
            current.value = 0;
        }

        // Prepare the updated value
        const newValue = current.value + 1;

        // Attempt an atomic commit: "check" ensures the counter
        // is unchanged, then "set" to newValue
        const result = await kv.atomic().check(current).set([ID_COUNTER], newValue).commit();

        // If commit succeeds, return the new ID
        if (result.ok) {
            return newValue;
        }

        // Otherwise, someone else updated the counter first;
        // read and try again
        current = await kv.get<number>([ID_COUNTER]);
    }
}
