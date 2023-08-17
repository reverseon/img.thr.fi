import {
    Router,
} from 'itty-router';

import {
    error
} from 'itty-router-extras';

import  {
    Env
} from '../../worker';

export const router = Router({
    base: '/static'
});

// static file import

import style__css from '../../static/css/style__css';
import cover__jpg from '../../static/img/cover__jpg';
import home__js from '../../static/js/home__js';
import favicon__ico from '../../static/img/favicon__ico';
import not_found__png from '../../static/img/not_found__png';

router.get('/css/style.css', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    return new Response(
        style__css({}), {
            headers: {
                'content-type': 'text/css',
            },
        }
    );
});

router.get('/js/home.js', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    return new Response(
        home__js({}), {
            headers: {
                'content-type': 'text/javascript',
            },
        }
    );
});

router.get('/img/cover.jpg', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    const base64 = cover__jpg({});
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    return new Response(
        bytes, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': bytes.length.toString(),
                'Content-Disposition': 'inline; filename="cover.jpg"',
                'Cache-Control': 'public, max-age=31536000',
            },
        }
    );
});

router.get('/img/favicon.ico', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    const base64 = favicon__ico({});
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    return new Response(
        bytes, {
            headers: {
                'Content-Type': 'image/x-icon',
                'Content-Length': bytes.length.toString(),
                'Content-Disposition': 'inline; filename="favicon.ico"',
                'Cache-Control': 'public, max-age=31536000',
            },
        }
    );
});

router.get('/img/not_found.png', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    return new Response(
        Uint8Array.from(atob(not_found__png({})), c => c.charCodeAt(0))
        , {
            headers: {
                'content-type': 'image/png',
            },
        }
    );
});
