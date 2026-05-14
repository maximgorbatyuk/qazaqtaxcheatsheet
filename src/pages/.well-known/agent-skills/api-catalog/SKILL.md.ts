import type { APIRoute } from 'astro';

export const prerender = true;

const content = `# API Catalog

Publishes \`/.well-known/api-catalog\` with media type \`application/linkset+json\`.
The catalog entry includes:
- \`anchor\`: API base URL
- \`service-desc\`: OpenAPI URL
- \`service-doc\`: Human-readable API docs
- \`status\`: Health endpoint
`;

export const GET: APIRoute = () =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
