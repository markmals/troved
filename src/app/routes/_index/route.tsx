import { db } from "$db/mod.ts";
import { GuestBook } from "$db/schema.ts";
import type { Route } from "./+types/route";
import { Welcome } from "./Welcome.tsx";

export function meta() {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    let name = formData.get("name");
    let email = formData.get("email");
    if (typeof name !== "string" || typeof email !== "string") {
        return { guestBookError: "Name and email are required" };
    }

    name = name.trim();
    email = email.trim();
    if (!name || !email) {
        return { guestBookError: "Name and email are required" };
    }

    try {
        await db.insert(GuestBook).values({ name, email });
    } catch {
        return { guestBookError: "Error adding to guest book" };
    }
}

export async function loader({ context }: Route.LoaderArgs) {
    const guestBook = await db.select().from(GuestBook);

    return {
        guestBook,
        message: context.VALUE_FROM_HONO,
    };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
    return (
        <Welcome
            guestBook={loaderData.guestBook}
            guestBookError={actionData?.guestBookError}
            message={loaderData.message}
        />
    );
}
