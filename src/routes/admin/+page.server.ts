import { comments_table_name, rocks_table_name } from '$lib/constants'
import { has } from '$lib/server/d1'

import type { PageServerLoad } from './$types'

export const ssr = true
export const prerender = false

async function fetch_comments(fetch: {
	(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
	(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>
}) {
	const comments_request = await fetch('/api/comment/admin')
	const comments = await comments_request.json()
	return comments
}

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const comments_initialized = await has(locals.db, comments_table_name)
	const rocks_initialized = await has(locals.db, rocks_table_name)

	return {
		title: 'Admin',
		description: 'Adjust administrator settings',
		comments_initialized,
		rocks_initialized,
		comments: fetch_comments(fetch),
	}
}
