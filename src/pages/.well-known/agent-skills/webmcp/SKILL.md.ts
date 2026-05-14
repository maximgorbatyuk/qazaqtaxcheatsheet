import type { APIRoute } from 'astro';

export const prerender = true;

const content = `# WebMCP

Registers browser tools using \`navigator.modelContext.provideContext()\`:
- \`open_section\` to navigate to routes/fragments
- \`copy_page_link\` to copy current URL

Tools are exposed at page load when a WebMCP-compatible user agent is present.
`;

export const GET: APIRoute = () =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
