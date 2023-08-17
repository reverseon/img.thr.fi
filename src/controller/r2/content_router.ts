import {
    Router,
} from 'itty-router';


import  {
    Env
} from '../../worker';
import { error, status} from 'itty-router-extras';
import { contentTypeMapping, getRandomAvailableKey } from '../common/r2';
import not_found__html from '../../view/not_found__html';

export const router = Router({
    base: '/content'
});


router.get('/status', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    let response = status(200, 'OK');
    response.headers.set('Content-Type', 'application/json');
    return response;
});

router.get('/:name', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    try {
        let name = (request as any).params.name;
        let data = await env.IMG_BUCKET.get(name);
        if (!data) {
            return new Response(
                not_found__html({}), {
                    headers: {
                        'content-type': 'text/html; charset=utf-8',
                    },
                    status: 404,
                }
            );
        } else {
            data = (data as R2ObjectBody);
            let response = new Response(
                data.body, {}
            );
            let namesplit = name.split('.');
            let ext = namesplit[namesplit.length - 1];
            let contentType = contentTypeMapping(ext);
            data.writeHttpMetadata(response.headers);
            response.headers.set('etag', data.etag);
            response.headers.set('Cache-Control', 'public, max-age=31536000');
            response.headers.set('Content-Type', contentType);
            return response;
        }
    } catch (e) {
        console.error(e);
        return error(400, 'Bad Request');
    }
});