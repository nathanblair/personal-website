import {
	comments_table_name,
	has,
	retrieve,
	rocks_table_name,
} from '$lib/server/comments/api.js'

export const ssr = true
export const prerender = false

/** @type {import('./$types.js').PageServerLoad} */
export async function load({ platform }) {
	const initialized = platform?.env.db
		? (await has(platform?.env.db, comments_table_name)) &&
			(await has(platform?.env.db, rocks_table_name))
		: Promise.resolve(false)
	return {
		title: 'Admin',
		description: 'Adjust administrator settings',
		structured_data: undefined,
		initialized,
		comments:
			platform?.env.db && initialized
				? retrieve(platform?.env.db, 'admin')
				: Promise.resolve({ results: [] }),
	}
}
