import { Router, withParams } from 'router';

const router = Router();

router
    .all('*', withParams)
    .get('/', () => Response.json({ ok: true }))
    .get('/channel', async () => {
        // let data;
        // let error;

        // try {
        //     data = await client.getChannel("UCxAS_aK7sS2x_bqnlJHDSHw");
        //     data = await data.getPlaylists();
        // } catch (e) {
        //     error = e;
        //     error.info = JSON.parse(error.info);
        // }

        // return Response.json({
        //     data,
        //     error,
        // });
    });

Deno.serve((request) => router.handle(request));
