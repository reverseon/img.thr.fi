import { Router } from "itty-router";
import { Env } from "../../worker";

export const router = Router({
    base: '/debug/r2'
});

router.get('/list', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    let keys = await env.IMG_BUCKET.list();
    return new Response(
        JSON.stringify(keys), {
            headers: {
                'content-type': 'application/json',
            },
        }
    );
});
router.get('/list/:prefix', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    let prefix = (request as any).params.prefix;
    let keys = await env.IMG_BUCKET.list(prefix);
    return new Response(
        JSON.stringify(keys), {
            headers: {
                'content-type': 'application/json',
            },
        }
    );
});

router.get('/delete/:name', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    let name = (request as any).params.name;
    await env.IMG_BUCKET.delete(name);
    return new Response(
        JSON.stringify({status: "OK"}), {
            headers: {
                'content-type': 'application/json',
            },
        }
    );
});

router.get('/delete_all', async (
    request: Request, env: Env, ctx: ExecutionContext
) => {
    let keys = (await env.IMG_BUCKET.list()).objects;
    for (let key of keys) {
        await env.IMG_BUCKET.delete(key.key);
    }
    return new Response(
        JSON.stringify({status: "OK"}), {
            headers: {
                'content-type': 'application/json',
            },
        }
    );
});
