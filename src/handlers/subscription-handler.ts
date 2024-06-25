import { body, BodyData, Handler, HttpMethod, resource, validation as v } from '@web/server';

@resource('/subscribe', HttpMethod.Post)
export class SubscriptionHandler extends Handler {
    private static readonly schema = v.object({ id: v.number() });

    @body({ accept: 'formData', input: SubscriptionHandler.schema })
    private accessor bodyData!: BodyData<typeof SubscriptionHandler.schema>;

    public async respond() {
        const data = await this.bodyData;
        return Response.json(data);
    }
}
