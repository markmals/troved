import { Form, href, Link, useNavigation, useSubmit } from "react-router";
import type { Route as SeriesDetails } from "./+types/series.$seriesId";
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

    const apiUrl = new URL("/api/search", request.url);
    apiUrl.searchParams.set("q", q);

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw response;
    }

    const results = (await response.json()) as SearchResult[];
    return { q, results };
}

export default function SeriesSearch({ loaderData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const submit = useSubmit();

    return (
        <main className="space-y-4 p-4">
            <Form className="space-y-2" method="get">
                <input
                    className="w-full rounded border p-2"
                    defaultValue={loaderData.q}
                    name="q"
                    onInput={e => {
                        submit(e.currentTarget.form, { replace: true });
                    }}
                    placeholder="Search series"
                    type="search"
                />
            </Form>
            {navigation.state === "loading" && <p>Searching...</p>}
            <ul className="space-y-2">
                {loaderData.results.map(result => (
                    <li key={result.id}>
                        <Link
                            to={href("/series/:seriesId", {
                                seriesId: String(result.id),
                            })}
                        >
                            {result.name ?? "Unnamed"}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export function ErrorBoundary() {
    throw new Response("Not Found", { status: 404 });
}
