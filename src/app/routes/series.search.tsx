import type { Route } from "./+types/series.search";

export async function loader(_: Route.LoaderArgs) {
    return { data: [] };
}

export default function SeriesSearch(_: Route.ComponentProps) {
    return <div>TODO: Series Search</div>;
}

export function ErrorBoundary() {
    throw new Response("Not Found", { status: 404 });
}
