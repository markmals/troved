import type { Route } from "./+types/series.$seriesId";

export async function loader({ params }: Route.LoaderArgs) {
    return { data: { seriesId: params.seriesId } };
}

export default function SeriesDetails({ loaderData }: Route.ComponentProps) {
    return <div>TODO: Series Details {loaderData.data.seriesId}</div>;
}

export function ErrorBoundary() {
    throw new Response("Not Found", { status: 404 });
}
