import { Form, href, Link, useSubmit } from "react-router";
import { Card, CardContent } from "~/components/ui/card.tsx";
import { Input } from "~/components/ui/input.tsx";
import { client } from "~/lib/clients.ts";
import type { Route } from "./+types/series.search";

interface SearchResult {
    id: number;
    overview?: string;
    name?: string;
}

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") ?? "";
    if (!q) {
        return { q, results: [] as SearchResult[] };
    }

    const result = await client.GET("/api/search", {
        params: { query: { q } },
        baseUrl: url.origin,
    });

    if (!result.data) {
        return { q, results: [] as SearchResult[] };
    }

    return { q, results: result.data };
}

export default function SeriesSearch({ loaderData }: Route.ComponentProps) {
    const submit = useSubmit();

    return (
        <main className="space-y-4 p-4">
            <Form className="space-y-2">
                <Input
                    defaultValue={loaderData.q}
                    name="q"
                    onInput={e => {
                        submit(e.currentTarget.form, { replace: true });
                    }}
                    placeholder="Search series"
                    type="search"
                />
            </Form>
            <ul className="space-y-2">
                {loaderData.results.map(result => (
                    <Card className="w-full" key={result.id}>
                        <CardContent>
                            <Link
                                to={href("/series/:seriesId", {
                                    seriesId: String(result.id),
                                })}
                            >
                                {result.name ?? "Unnamed"}
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </ul>
        </main>
    );
}
