import { Handler, HttpMethod, resource, searchParam } from '@web/server';
import { Trakt } from '../api/trakt/client.ts';

@resource('/air-dates', HttpMethod.Get)
export class AirDateHandler extends Handler {
    private readonly traktApiKey = Deno.env.get('TRAKT_CLIENT_ID')!;
    private readonly client = new Trakt(this.traktApiKey);

    @searchParam()
    private accessor id!: string;

    public async respond() {
        const response = await this.client.airDates({ showId: this.id });
        return Response.json(response);
    }
}
