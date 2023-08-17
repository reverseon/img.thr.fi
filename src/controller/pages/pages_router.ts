import {
    Router,
} from 'itty-router';

import {
    error
} from 'itty-router-extras';

import  {
    Env
} from '../../worker';
import index__html from '../../view/index__html';
import { getRandomAvailableKey } from '../common/r2';

export const router = Router({
    base: '/'
});


router.get('/', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    const index__base__context = {
        title: "Home",
        base_url: env.BASE_URL,
    }
    return new Response(
        index__html({
            ...index__base__context,
        }), {
            headers: {
                'content-type': 'text/html; charset=utf-8',
            },
        }
    );
});

router.post('/', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    const index__base__context = {
        title: "Home",
        base_url: env.BASE_URL,
    }
    interface RequestBody {
        image: File | null
    }
    let body: RequestBody = {
        image: null
    }
    interface ServerResponse {
        message: string,
        alert_type: string,
    }
    try {
        // request body is multipart/form-data
        const fd = await request.formData();
        // if there are keys other than "image" raise an error
        for (let [key, value] of fd.entries()) {
            if (key !== 'image') {
                // return error(400, 'form-data key other than "image" not allowed');
                return new Response(
                    index__html({
                        ...index__base__context,
                        server_notification: {
                            message: 'form-data key other than "image" not allowed',
                            alert_type: 'alert-danger',
                        } as ServerResponse,
                    }), {
                        status: 400,
                        headers: {
                            'content-type': 'text/html; charset=utf-8',
                        },
                    }
                )
            } else {
                body = {
                    image: (value as unknown) as File
                }
            }
        }
        if (body.image === null) {
            // return error(400, 'No image found');
            return new Response(
                index__html({
                    title: 'Home',
                    server_notification: {
                        message: 'No image found',
                        alert_type: 'alert-danger',
                    } as ServerResponse,
                }), {
                    status: 400,
                    headers: {
                        'content-type': 'text/html; charset=utf-8',
                    },
                }
            )
        } else if (body.image.size > 1024 * 1024 * 10) {
            // return error(400, 'Image too large, max 10MB');
            return new Response(
                index__html({
                    ...index__base__context,
                    server_notification: {
                        message: 'Image too large, max 10MB',
                        alert_type: 'alert-danger',
                    } as ServerResponse,
                }), {
                    status: 400,
                    headers: {
                        'content-type': 'text/html; charset=utf-8',
                    },
                }
            )
        } /* jpg, png, gif */ else if (!['image/jpeg', 'image/png', 'image/gif'].includes(body.image.type)) {
            // return error(400, 'Only jpg, png, gif allowed');
            return new Response(
                index__html({
                    ...index__base__context,
                    server_notification: {
                        message: 'Only jpg, png, or gif allowed',
                        alert_type: 'alert-danger',
                    } as ServerResponse,
                }), {
                    status: 400,
                    headers: {
                        'content-type': 'text/html; charset=utf-8',
                    },
                }
            )
        } else if (body.image.name.split('.').length !== 2) {
            // return error(400, 'Bad Request');
            return new Response(
                index__html({
                    ...index__base__context,
                    server_notification: {
                        message: 'Bad Request',
                        alert_type: 'alert-danger',
                    } as ServerResponse,
                }), {
                    status: 400,
                    headers: {
                        'content-type': 'text/html; charset=utf-8',
                    },
                }
            )
        }
    } catch (e) {
        console.error(e);
        // return error(400, 'Bad Request');
        return new Response(
            index__html({
                ...index__base__context,
                server_notification: {
                    message: 'Bad Request',
                    alert_type: 'alert-danger',
                } as ServerResponse,
            }), {
                status: 400,
                headers: {
                    'content-type': 'text/html; charset=utf-8',
                },
            }
        )
    }
    try {
        const key = await getRandomAvailableKey(env.IMG_BUCKET, body.image!.name);
        await env.IMG_BUCKET.put(key, body.image!);
        return new Response(
            index__html({
                ...index__base__context,
                url_result: env.BASE_URL + '/content/' + key,
            }), {
                status: 200,
                headers: {
                    'content-type': 'text/html; charset=utf-8',
                },
            }
        )
    } catch (e) {
        console.error(e);
        // return error(500, 'Internal Server Error');
        return new Response(
            index__html({
                ...index__base__context,
                server_notification: {
                    message: 'Internal Server Error',
                    alert_type: 'alert-danger',
                } as ServerResponse,
            }), {
                status: 500,
                headers: {
                    'content-type': 'text/html; charset=utf-8',
                },
            }
        )
    }
});