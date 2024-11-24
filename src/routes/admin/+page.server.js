import { has, retrieve } from '$lib/server/comments/api.js'

export const ssr = true
export const prerender = false

const test_slug_title = 'test'

/** @type {import('./$types.js').PageServerLoad} */
export async function load({ platform }) {
	const initialized = platform?.env.comments
		? await has(platform?.env.comments, test_slug_title)
		: Promise.resolve(false)
	return {
		title: 'Admin',
		description: 'Adjust administrator settings',
		structured_data: undefined,
		initialized,
		comments:
			platform?.env.comments && initialized
				? retrieve(platform?.env.comments, 'test')
				: Promise.resolve({ results: [] }),
	}
}
