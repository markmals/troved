import { Handler } from '~/lib/handler.ts';
import { body, resource } from '~/lib/decorators/mod.ts';
import { HttpMethod } from '~/lib/types.ts';

@resource('/subscribe', HttpMethod.Post)
export class SubscriptionHandler extends Handler {
    @body('formData')
    private accessor form!: Promise<FormData>;

    async respond() {
        return Response.json({});
    }
}
