import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://qazaqtaxcheatsheet.fyi';

	const spec = {
		openapi: '3.1.0',
		info: {
			title: 'Qazaq Tax Cheatsheet Public API',
			version: '1.0.0',
			description: 'Minimal public endpoints for agent and service discovery.',
		},
		servers: [{ url: baseUrl }],
		paths: {
			'/api/status': {
				get: {
					summary: 'Service health status',
					operationId: 'getServiceStatus',
					responses: {
						'200': {
							description: 'Service status',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											status: { type: 'string' },
											service: { type: 'string' },
											version: { type: 'string' },
											updatedAt: { type: 'string', format: 'date-time' },
										},
										required: ['status', 'service', 'version', 'updatedAt'],
									},
								},
							},
						},
					},
				},
			},
		},
	};

	return new Response(JSON.stringify(spec, null, 2), {
		headers: {
			'Content-Type': 'application/openapi+json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
