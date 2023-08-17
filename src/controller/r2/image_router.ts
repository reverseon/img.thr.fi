import {
    Router,
} from 'itty-router';


import  {
    Env
} from '../../worker';
import { error, status} from 'itty-router-extras';
import { getRandomAvailableKey } from '../common/r2';

export const router = Router({
    base: '/img'
});


router.get('/status', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    let response = status(200, 'OK');
    response.headers.set('Content-Type', 'application/json');
    return response;
});

router.post('/create', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    interface RequestBody {
        image: File | null
    }
    let body: RequestBody = {
        image: null
    }
    try {
        // request body is multipart/form-data
        const fd = await request.formData();
        // if there are keys other than "image" raise an error
        for (let [key, value] of fd.entries()) {
            if (key !== 'image') {
                return error(400, 'form-data key other than "image" not allowed');
            } else {
                body = {
                    image: (value as unknown) as File
                }
            }
        }
        if (body.image === null) {
            return error(400, 'No image found');
        } else if (body.image.size > 1024 * 1024 * 10) {
            return error(400, 'Image too large, max 10MB');
        } /* jpg, png, gif */ else if (!['image/jpeg', 'image/png', 'image/gif'].includes(body.image.type)) {
            return error(400, 'Only jpg, png, or gif allowed');
        } else if (body.image.name.split('.').length !== 2) {
            return error(400, 'Bad Request');
        }
    } catch (e) {
        console.error(e);
        return error(400, 'Bad Request');
    }
    try {
        const key = await getRandomAvailableKey(env.IMG_BUCKET, body.image!.name);
        await env.IMG_BUCKET.put(key, body.image!);
        return new Response(
            JSON.stringify({
                url: env.BASE_URL + '/content/' + key
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
        });
    } catch (e) {
        console.error(e);
        return error(500, 'Internal Server Error');
    }
});