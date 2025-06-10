import { tmdb } from "$api/services/mod.ts";
import { subscribeToSeries, unsubscribeFromSeries } from "$db/subscriptions.ts";
import { CircleCheck, PlusCircle } from "lucide-react";
import { data, redirect, useFetcher } from "react-router";
import { Badge } from "~/components/ui/badge.tsx";
import { Button } from "~/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card.tsx";
import { formatIsoDate } from "~/lib/dates.ts";
import type { Route } from "./+types/route.ts";

/** Load series details and subscription state */
export async function loader({ params }: Route.LoaderArgs) {
    const id = params.seriesId;
    const rawSeries = await tmdb.getSeriesDetails(id);

    if (!rawSeries) {
        throw data("Not Found", { status: 404 });
    }

    // Process series data in the loader
    const series = {
        ...rawSeries,
        posterUrl: rawSeries.poster_path
            ? `https://image.tmdb.org/t/p/w500${rawSeries.poster_path}`
            : null,
        formattedLastAirDate: rawSeries.last_air_date
            ? formatIsoDate(new Date(rawSeries.last_air_date))
            : null,
        nextEpisode: rawSeries.next_episode_to_air
            ? {
                  ...rawSeries.next_episode_to_air,
                  formattedAirDate: formatIsoDate(new Date(rawSeries.next_episode_to_air.air_date)),
                  seasonEpisode: `S${rawSeries.next_episode_to_air.season_number.toString().padStart(2, "0")}E${rawSeries.next_episode_to_air.episode_number.toString().padStart(2, "0")}`,
              }
            : null,
        formattedCountries:
            rawSeries.origin_country?.map(country => ({
                code: country,
                name: new Intl.DisplayNames(["en"], { type: "region" }).of(country) || country,
            })) || [],
        primaryNetwork: rawSeries.networks?.[0] || null,
    };

    // const subscribed = await isSeriesSubscribed(Number(id));

    return { series, isSubscribed: false };
}

/** Subscribe or unsubscribe based on form intent */
export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const id = Number(params.seriesId);

    if (intent === "subscribe") {
        const series = await tmdb.getSeriesDetails(params.seriesId);

        if (!series) return { error: "Could not get series details." };

        await subscribeToSeries(id, {
            name: series.name ?? "",
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
    const { series } = loaderData;

    const subscribed = fetcher.formData
        ? fetcher.formData.get("intent") === "unsubscribe"
        : loaderData.isSubscribed;

    return (
        <div className="space-y-6 px-12">
            <div className="flex flex-col gap-6 md:flex-row">
                {series.posterUrl && (
                    <div className="flex-shrink-0">
                        <img
                            alt={series.name}
                            className="h-auto w-64 rounded-lg shadow-lg"
                            src={series.posterUrl}
                        />
                    </div>
                )}

                <div className="flex-1 space-y-4">
                    <div className="flex flex-row justify-between">
                        <h1 className="mb-2 font-bold text-3xl">{series.name}</h1>
                        <fetcher.Form className="inline-block" method="post">
                            <input
                                name="intent"
                                type="hidden"
                                value={subscribed ? "unsubscribe" : "subscribe"}
                            />
                            <Button
                                disabled={fetcher.state !== "idle"}
                                type="submit"
                                variant="outline"
                            >
                                {subscribed ? <CircleCheck /> : <PlusCircle />}
                                {subscribed ? "Unsubscribe" : "Subscribe"}
                            </Button>
                        </fetcher.Form>
                    </div>

                    {series.overview && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-400">
                                    {series.overview}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium">{series.status}</p>
                                <p className="text-gray-600 text-sm dark:text-gray-500">
                                    {series.in_production ? "In Production" : "Not in Production"}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Seasons</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-bold text-2xl">{series.number_of_seasons}</p>
                            </CardContent>
                        </Card>

                        {series.formattedLastAirDate && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Last Air Date</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-mono text-sm">
                                        {series.formattedLastAirDate}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {series.nextEpisode && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Next Episode</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-medium">
                                        {series.nextEpisode.seasonEpisode} –{" "}
                                        {series.nextEpisode.name}
                                    </p>
                                    <p className="font-mono text-gray-600 text-sm">
                                        {series.nextEpisode.formattedAirDate}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {series.genres && series.genres.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Genres</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {series.genres.map(genre => (
                                            <Badge key={genre.id} variant="outline">
                                                {genre.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {series.primaryNetwork && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Network</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-1">
                                        <p className="text-sm">{series.primaryNetwork.name}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {series.formattedCountries.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Origin Country</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {series.formattedCountries.map(country => (
                                            <Badge key={country.code} variant="outline">
                                                {country.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {series.spoken_languages && series.spoken_languages.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Languages</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-1">
                                        {series.spoken_languages.map(language => (
                                            <p className="text-sm" key={language.iso_639_1}>
                                                {language.english_name}
                                            </p>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    return <div>{error.message}</div>;
}
