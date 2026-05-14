import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const resource = site?.toString().replace(/\/$/, '') ?? 'https://qazaqtaxcheatsheet.fyi';

	const payload = {
		resource,
		authorization_servers: [resource],
		scopes_supported: ['read:status'],
		bearer_methods_supported: ['header'],
		resource_documentation: `${resource}/docs/api`,
	};

	return new Response(JSON.stringify(payload, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
