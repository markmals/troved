import { MovieDb as TheMovieDB } from 'tmdb';
import { body, query, Responder } from './responder.ts';

export class SubscriptionResponder implements Responder {
    @body('formData')
    private accessor form!: Promise<FormData>;

    async execute() {
        return Response.json({});
    }
}
