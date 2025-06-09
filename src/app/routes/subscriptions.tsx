import type { Route } from "./+types/subscriptions";

export async function loader(_: Route.LoaderArgs) {
    return { data: [] };
}

export default function Subscriptions(_: Route.ComponentProps) {
    return <div>TODO: Subscriptions</div>;
}

export function ErrorBoundary() {
    throw new Response("Not Found", { status: 404 });
}
