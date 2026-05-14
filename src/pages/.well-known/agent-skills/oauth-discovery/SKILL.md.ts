import type { APIRoute } from 'astro';

export const prerender = true;

const content = `# OAuth/OIDC Discovery

Publishes discovery metadata endpoints:
- \`/.well-known/openid-configuration\`
- \`/.well-known/oauth-authorization-server\`
- \`/.well-known/oauth-protected-resource\`

These endpoints provide machine-readable authentication metadata for agents.
`;

export const GET: APIRoute = () =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
