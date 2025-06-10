import { api } from "$api/mod.ts";
import type { Route } from "./+types/api.$.ts";

export const loader = async ({ request }: Route.LoaderArgs) => api.fetch(request);
export const action = ({ request }: Route.ActionArgs) => api.fetch(request);
