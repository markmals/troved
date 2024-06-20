import { MovieDb as TheMovieDB } from 'tmdb';
import { resource, searchParam } from '~/lib/decorators/mod.ts';
import { HttpMethod } from '~/api/resty.ts';
import { Handler } from '~/lib/handler.ts';

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
