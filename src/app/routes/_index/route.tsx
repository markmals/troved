import { db } from "$db/mod.ts";
import { GuestBook } from "$db/schema.ts";
import { z } from "zod";
import type { Route } from "./+types/route";
import { Welcome } from "./Welcome.tsx";

const actionInputSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Invalid email format").trim(),
});

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const result = actionInputSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return { guestBookError: result.error.errors[0].message };
    }

    try {
        await db.insert(GuestBook).values({
            name: result.data.name,
            email: result.data.email,
        });
    } catch {
        return { guestBookError: "Error adding to guest book" };
    }
}

export async function loader(_args: Route.LoaderArgs) {
    const guestBook = await db.select().from(GuestBook);

    return { guestBook };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
    return (
        <>
            <title>New React Router App</title>
            <meta content="Welcome to React Router!" name="description" />
            <Welcome
                guestBook={loaderData.guestBook}
                guestBookError={actionData?.guestBookError}
            />
        </>
    );
}
