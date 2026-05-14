import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://qazaqtaxcheatsheet.fyi';

	const payload = {
		$schema: 'https://agentskills.io/schemas/agent-skills-index.v0.2.0.json',
		version: '0.2.0',
		skills: [
			{
				name: 'link-headers',
				type: 'discovery',
				description: 'Advertise API resources via RFC 8288 Link headers.',
				url: `${baseUrl}/.well-known/agent-skills/link-headers/SKILL.md`,
				sha256: '9008a9e199c86a11085cd45e9ea715ade01cbdbc57313b70fd0af1ff244cab07',
			},
			{
				name: 'markdown-negotiation',
				type: 'content-negotiation',
				description: 'Return markdown representation when Accept: text/markdown.',
				url: `${baseUrl}/.well-known/agent-skills/markdown-negotiation/SKILL.md`,
				sha256: '5c093b4d6ebea514251e3e6e86fb66c89f11090af76f6d1cf888de9846f377f2',
			},
			{
				name: 'content-signals',
				type: 'policy',
				description: 'Declare AI content usage preferences in robots.txt.',
				url: `${baseUrl}/.well-known/agent-skills/content-signals/SKILL.md`,
				sha256: '9ed4e4a6453cda6e9740deb813b9929e19d46021f442885ebb8aedffbf3a3a9d',
			},
			{
				name: 'api-catalog',
				type: 'api-discovery',
				description: 'Expose API catalog in application/linkset+json format.',
				url: `${baseUrl}/.well-known/agent-skills/api-catalog/SKILL.md`,
				sha256: '401b57832e69bb7623104a13b2175020b277de82a5f4f9fe303e1c7267c82778',
			},
			{
				name: 'oauth-discovery',
				type: 'auth-discovery',
				description: 'Expose OIDC/OAuth metadata and protected resource metadata.',
				url: `${baseUrl}/.well-known/agent-skills/oauth-discovery/SKILL.md`,
				sha256: '088413037368dedab8c27aff1066359253c6e23a90ebe7cccfe1099564fcde96',
			},
			{
				name: 'webmcp',
				type: 'agent-tools',
				description: 'Expose browser-native tools to compatible AI agents.',
				url: `${baseUrl}/.well-known/agent-skills/webmcp/SKILL.md`,
				sha256: 'e8bebb8811a494c65309e2b34060af2d1151e732db2cbe2903cb5a0202592fbc',
			},
		],
	};

	return new Response(JSON.stringify(payload, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
