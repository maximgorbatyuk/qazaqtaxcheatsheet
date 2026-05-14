import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://qazaqtaxcheatsheet.fyi';

	const payload = {
		linkset: [
			{
				anchor: `${baseUrl}/api`,
				'service-desc': [{ href: `${baseUrl}/api/openapi.json`, type: 'application/openapi+json' }],
				'service-doc': [{ href: `${baseUrl}/docs/api`, type: 'text/html' }],
				status: [{ href: `${baseUrl}/api/status`, type: 'application/json' }],
			},
		],
	};

	return new Response(JSON.stringify(payload, null, 2), {
		headers: {
			'Content-Type': 'application/linkset+json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
