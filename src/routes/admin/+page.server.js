import { comments_table_name, rocks_table_name } from '$lib/constants.js'
import { has } from '$lib/server/d1.js'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

/**
 * @param {{
 * (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
 * (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
 * }} fetch
 */
async function fetch_comments(fetch) {
	return await (await fetch('/comment/admin')).json()
}

/** @type {import('./$types.js').PageServerLoad} */
export async function load({ platform, fetch }) {
	if (!platform?.env.db) error(500, 'Database not initialized')

	const comments_initialized = await has(platform?.env.db, comments_table_name)
	const rocks_initialized = await has(platform?.env.db, rocks_table_name)

	return {
		title: 'Admin',
		description: 'Adjust administrator settings',
		comments_initialized,
		rocks_initialized,
		comments: fetch_comments(fetch),
	}
}
