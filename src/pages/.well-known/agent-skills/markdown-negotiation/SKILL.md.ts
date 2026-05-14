import type { APIRoute } from 'astro';

export const prerender = true;

const content = `# Markdown Negotiation

When \`Accept: text/markdown\` is sent, HTML responses can be transformed into markdown.
The middleware returns:
- \`Content-Type: text/markdown; charset=utf-8\`
- \`Vary: Accept\`
- \`x-markdown-tokens\` (best-effort token count)
`;

export const GET: APIRoute = () =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
