import type { MiddlewareHandler } from 'astro';

const LINK_HEADER_VALUE = [
	'</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
	'</api/openapi.json>; rel="service-desc"; type="application/openapi+json"',
	'</docs/api>; rel="service-doc"; type="text/html"',
	'</api/status>; rel="status"; type="application/json"',
].join(', ');

const appendVary = (existing: string | null, token: string): string => {
	if (!existing) {
		return token;
	}

	const values = new Set(
		existing
			.split(',')
			.map((value) => value.trim())
			.filter(Boolean),
	);
	values.add(token);
	return [...values].join(', ');
};

const acceptsMarkdown = (acceptHeader: string | null): boolean => {
	if (!acceptHeader) {
		return false;
	}

	return acceptHeader
		.split(',')
		.map((entry) => entry.trim().toLowerCase())
		.some((entry) => entry.startsWith('text/markdown') || entry.includes('text/markdown'));
};

const simplifyWhitespace = (value: string): string =>
	value.replace(/\r/g, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

const htmlToMarkdown = (html: string): string => {
	const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
	let source = bodyMatch ? bodyMatch[1] : html;

	source = source
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<nav[\s\S]*?<\/nav>/gi, '')
		.replace(/<footer[\s\S]*?<\/footer>/gi, '')
		.replace(/<main[^>]*>/gi, '')
		.replace(/<\/main>/gi, '')
		.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n')
		.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
		.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
		.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n')
		.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n##### $1\n')
		.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n###### $1\n')
		.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
		.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
		.replace(/<\/?(ul|ol)[^>]*>/gi, '\n')
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>/gi, '\n\n')
		.replace(/<p[^>]*>/gi, '')
		.replace(/<\/?[^>]+>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&#39;/g, "'")
		.replace(/&quot;/g, '"');

	return simplifyWhitespace(source);
};

export const onRequest: MiddlewareHandler = async ({ request }, next) => {
	const response = await next();
	const headers = new Headers(response.headers);

	headers.set('Link', LINK_HEADER_VALUE);
	headers.set('Vary', appendVary(headers.get('Vary'), 'Accept'));

	if (
		acceptsMarkdown(request.headers.get('accept')) &&
		response.status >= 200 &&
		response.status < 300 &&
		(headers.get('content-type') || '').toLowerCase().includes('text/html')
	) {
		const markdown = htmlToMarkdown(await response.text());
		headers.set('Content-Type', 'text/markdown; charset=utf-8');
		headers.set('x-markdown-tokens', String(markdown.split(/\s+/).filter(Boolean).length));
		return new Response(markdown, { status: response.status, headers });
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
};
