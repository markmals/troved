import { Responder } from '../lib/interfaces.ts';
import { body } from '../lib/routing.ts';

export class SubscriptionResponder implements Responder {
    @body('formData')
    private accessor form!: Promise<FormData>;

    async execute() {
        return Response.json({});
    }
}
