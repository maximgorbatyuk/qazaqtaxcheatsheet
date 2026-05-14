import type { APIRoute } from 'astro';

export const prerender = true;

const tokenNotEnabledResponse = () =>
	new Response(
		JSON.stringify(
			{
				error: 'unsupported_grant_type',
				error_description:
					'This endpoint is published for metadata discovery only. Token issuance is not enabled.',
			},
			null,
			2,
		),
		{
			status: 400,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Cache-Control': 'no-store',
			},
		},
	);

export const GET: APIRoute = () => tokenNotEnabledResponse();
