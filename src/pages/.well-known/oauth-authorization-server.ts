import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const issuer = site?.toString().replace(/\/$/, '') ?? 'https://qazaqtaxcheatsheet.fyi';

	const payload = {
		issuer,
		authorization_endpoint: `${issuer}/oauth/authorize`,
		token_endpoint: `${issuer}/oauth/token`,
		jwks_uri: `${issuer}/oauth/jwks.json`,
		grant_types_supported: ['authorization_code', 'client_credentials'],
		response_types_supported: ['code'],
		token_endpoint_auth_methods_supported: ['none'],
		scopes_supported: ['read:status'],
	};

	return new Response(JSON.stringify(payload, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
