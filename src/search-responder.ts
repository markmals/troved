import { MovieDb as TheMovieDB } from 'tmdb';
import { body, query, Responder } from './responder.ts';

export class SearchResponder implements Responder {
    private readonly tmdbApiKey = Deno.env.get('TMDB_API_KEY')!;
    private readonly client = new TheMovieDB(this.tmdbApiKey);

    @query()
    private accessor q!: string;

    async execute() {
        const response = await this.client.searchTv({ query: this.q });
        return Response.json(
            response.results?.map(({ id, overview, name }) => ({
                id,
                overview,
                name,
            })),
        );
    }
}
