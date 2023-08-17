/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import {
	Router
} from 'itty-router';

import {
	status, error, json
} from 'itty-router-extras';

import {
	createCors
} from 'itty-cors';

import {
	router as staticRouter
} from './controller/static/static_router';

import {
	router as pagesRouter
} from './controller/pages/pages_router';

import {
	router as imageRouter
} from './controller/r2/image_router';

import {
	router as contentRouter
} from './controller/r2/content_router';

// import {
// 	router as debugRouter
// } from './controller/r2/debug_router';

import not_found__html from './view/not_found__html';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//

	IMG_BUCKET: R2Bucket;
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
	BASE_URL: string;
}

const  {
	preflight, corsify
} = createCors({
	methods: [
		'GET',
		'POST',
	],
	maxAge: 86400,
});

const router = Router();

router.all('*', preflight);

router.all('/*', pagesRouter.handle);

router.all('/static/*', staticRouter.handle);

router.all('/img/*', imageRouter.handle);

router.all('/content/*', contentRouter.handle);

// router.all('/debug/r2/*', debugRouter.handle);

router.all('*', () => {
	return new Response(
		not_found__html({}), {
			headers: {
				'content-type': 'text/html; charset=utf-8',
			},
			status: 404,
		}
	);
})

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return router.handle(request, env, ctx)
		.catch((err: Error) => {
			console.error(err);
			return error(500, 'Internal Server Error');
		})
		.then(corsify);
	}	
};
