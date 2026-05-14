import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () =>
	new Response(
		JSON.stringify(
			{
				error: 'unsupported_response_type',
				error_description:
					'This endpoint is published for metadata discovery only. Interactive authorization is not enabled.',
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
