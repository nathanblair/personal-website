import { add, clean, has, init, retrieve } from '$lib/server/comments/api.js'
import { error } from '@sveltejs/kit'

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

export const actions = {
	submit: async ({ platform, locals, request }) => {
		if (!platform?.env.comments) error(500, 'Comments not initialized')

		const session = await locals.auth()
		if (!session) error(404, 'Not signed in')

		const user_id = session.user?.id
		if (!user_id) error(404, 'User id not found')
		const user_name = session.user?.name
		if (!user_name) error(404, 'User name not found')
		const user_email = session.user?.email
		const user_image = session.user?.image

		const form = await request.formData()
		const comment = form.get('comment')?.toString()
		if (!comment) throw new Error('Comment not found')

		return add(platform?.env.comments, 'test', {
			user_id,
			user_name,
			user_image,
			user_email,
			date: new Date().toLocaleString(),
			body: comment,
		})
	},
	'clean-test-slug': async ({ platform }) => {
		if (!platform?.env.comments) {
			error(500, 'Comments not initialized')
		}
		await clean(platform?.env.comments, 'test')
		return
	},
	'init-test-slug': async ({ platform }) => {
		if (!platform?.env.comments) {
			error(500, 'Comments not initialized')
		}
		await init(platform?.env.comments, 'test')
		return
	},
}
