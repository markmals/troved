import { body, BodyData, Handler, HttpMethod, resource } from '@web/server';
import { z } from 'npm:zod@3.23.8';

@resource('/subscribe', HttpMethod.Post)
export class SubscriptionHandler extends Handler {
    private static readonly schema = z.object({ id: z.number() });

    @body({ accept: 'formData', input: SubscriptionHandler.schema })
    private accessor form!: BodyData<typeof SubscriptionHandler.schema>;

    public async respond() {
        const bodyData = await this.form;
        return Response.json(bodyData);
    }
}
