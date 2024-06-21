import { body, Handler, HttpMethod, resource } from '@web/server';

@resource('/subscribe', HttpMethod.Post)
export class SubscriptionHandler extends Handler {
    @body('formData')
    private accessor form!: Promise<FormData>;

    async respond() {
        return Response.json({});
    }
}
