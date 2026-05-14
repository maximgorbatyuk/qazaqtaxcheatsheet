import type { APIRoute } from 'astro';

export const prerender = true;

const content = `# Content Signals

Declares AI usage preferences in \`/robots.txt\`:

\`\`\`
Content-Signal: ai-train=no, search=yes, ai-input=no
\`\`\`
`;

export const GET: APIRoute = () =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
