import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://qazaqtaxcheatsheet.fyi';

	const payload = {
		$schema: 'https://modelcontextprotocol.io/schemas/server-card-2025-09.schema.json',
		serverInfo: {
			name: 'qazaqtaxcheatsheet-web',
			version: '1.0.0',
			description: 'Public tax guide resources for Kazakhstan sole proprietors on USN.',
		},
		transports: [
			{
				type: 'http',
				url: `${baseUrl}/api/status`,
				description: 'Discovery/status endpoint for the site service surface.',
			},
		],
		capabilities: {
			tools: {
				available: ['open_section', 'copy_page_link'],
			},
			resources: {
				available: ['/.well-known/api-catalog', '/api/openapi.json'],
			},
		},
	};

	return new Response(JSON.stringify(payload, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
