import { Handler, HttpMethod, resource, searchParam } from '@web/server';
import { MovieDb as TheMovieDB } from 'tmdb';

@resource('/search', HttpMethod.Get)
export class SearchHandler extends Handler {
    private readonly tmdbApiKey = Deno.env.get('TMDB_API_KEY')!;
    private readonly client = new TheMovieDB(this.tmdbApiKey);

    @searchParam()
    private accessor q!: string;

    async respond() {
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
