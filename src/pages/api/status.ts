import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://qazaqtaxcheatsheet.fyi';

	return new Response(
		JSON.stringify(
			{
				status: 'ok',
				service: 'qazaqtaxcheatsheet-public-api',
				version: '1.0.0',
				updatedAt: new Date().toISOString(),
				links: {
					catalog: `${baseUrl}/.well-known/api-catalog`,
					openapi: `${baseUrl}/api/openapi.json`,
					docs: `${baseUrl}/docs/api`,
				},
			},
			null,
			2,
		),
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Cache-Control': 'public, max-age=300',
			},
		},
	);
};
