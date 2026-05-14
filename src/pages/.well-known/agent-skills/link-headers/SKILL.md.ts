import type { APIRoute } from 'astro';

export const prerender = true;

const content = `# Link Headers

Adds RFC 8288 Link response headers that advertise:
- API catalog at \`/.well-known/api-catalog\`
- OpenAPI description at \`/api/openapi.json\`
- API documentation at \`/docs/api\`
- Status endpoint at \`/api/status\`
`;

export const GET: APIRoute = () =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
