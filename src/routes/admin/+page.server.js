import { add, clean, has, init, retrieve } from '$lib/server/comments/api.js'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

const test_slug_title = 'test'

/** @type {import('./$types.js').PageServerLoad<PageOutput & {initialized: Promise<boolean>}>} */
export function load({ platform }) {
	const title = 'Admin'
	const description = `Adjust administrator settings`
	const structured_data = undefined
	/** @type {Promise<boolean>} */
	let initialized = Promise.resolve(false)
	const db = platform?.env.comments
	if (db) {
		initialized = has(db, test_slug_title)
	}

	return {
		title,
		description,
		structured_data,
		initialized,
	}
}

export const actions = {
	submit: async ({ platform, locals, request }) => {
		if (!platform?.env.comments) {
			error(500, 'Comments not initialized')
		}

		const session = await locals.auth()
		if (!session) {
			error(404, 'Not signed in')
		}

		const user_id = session.user?.id
		if (!user_id) {
			error(404, 'User not found')
		}

		const form = await request.formData()
		const comment = form.get('comment')?.toString()
		if (comment === undefined) throw new Error('Comment not found')

		await add(platform?.env.comments, 'test', {
			author: user_id,
			body: comment,
		})
		return
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
	'test-comments': async ({ platform }) => {
		if (!platform?.env.comments) {
			error(500, 'Comments not initialized')
		}
		const comments = await retrieve(platform?.env.comments, 'test')
		return comments
	},
}
