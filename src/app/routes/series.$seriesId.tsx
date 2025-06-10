import { tmdb } from "$api/services/mod.ts";
import { isSeriesSubscribed, subscribeToSeries, unsubscribeFromSeries } from "$db/subscriptions.ts";
import { data, redirect, useFetcher } from "react-router";
import { Button } from "~/components/ui/button.tsx";
import type { Route } from "./+types/series.$seriesId";

/** Load series details and subscription state */
export async function loader({ params }: Route.LoaderArgs) {
    const id = params.seriesId;
    const series = await tmdb.getSeriesDetails(id);

    if (!series) {
        throw data("Not Found", { status: 404 });
    }

    const subscribed = await isSeriesSubscribed(Number(id));

    return { series, isSubscribed: subscribed };
}

/** Subscribe or unsubscribe based on form intent */
export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const id = Number(params.seriesId);

    if (intent === "subscribe") {
        const series = await tmdb.getSeriesDetails(params.seriesId);
        await subscribeToSeries(id, {
            name: series.name,
            posterPath: series.poster_path ?? undefined,
            firstAirDate: series.first_air_date ?? undefined,
        });
        return redirect("/subscriptions");
    }

    if (intent === "unsubscribe") {
        await unsubscribeFromSeries(id);
        return null;
    }

    return null;
}

export default function SeriesDetails({ loaderData }: Route.ComponentProps) {
    const fetcher = useFetcher();

    const subscribed = fetcher.formData
        ? fetcher.formData.get("intent") === "unsubscribe"
        : loaderData.isSubscribed;

    return (
        <div className="space-y-4">
            <h1 className="font-bold text-2xl">{loaderData.series.name}</h1>
            <fetcher.Form className="inline-block" method="post">
                <input
                    name="intent"
                    type="hidden"
                    value={subscribed ? "unsubscribe" : "subscribe"}
                />
                <Button disabled={fetcher.state !== "idle"} type="submit">
                    {subscribed ? "Unsubscribe" : "Subscribe"}
                </Button>
            </fetcher.Form>
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    return <div>{error.message}</div>;
}
