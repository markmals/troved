import { Responder } from '../lib/interfaces.ts';
import { query } from '../lib/routing.ts';
import { Trakt } from '../api/trakt/client.ts';

export class AirDateResponder implements Responder {
    private readonly traktApiKey = Deno.env.get('TRAKT_CLIENT_ID')!;
    private readonly client = new Trakt(this.traktApiKey);

    @query()
    private accessor id!: string;

    async execute() {
        const response = await this.client.airDates({ showId: this.id });
        return Response.json(response);
    }
}
