import { add, clean, edit, init, remove } from '$lib/server/comments/api.js'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

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
			date_posted: new Date().toLocaleString(),
			body: comment,
		})
	},
	delete: async ({ platform, url }) => {
		if (!platform?.env.comments) error(500, 'Comments not initialized')

		const id = url.searchParams.get('id')
		if (!id) error(500, 'Comment id invalid')

		return remove(platform?.env.comments, 'test', parseInt(id, 10))
	},
	edit: async ({ platform, request, url }) => {
		if (!platform?.env.comments) error(500, 'Comments not initialized')

		const formData = await request.formData()
		const body = formData.get('body')?.toString()
		if (!body) error(500, 'Comment body not found')

		const id = url.searchParams.get('id')?.toString()
		if (!id) error(500, 'Comment ID not found')

		console.log('Edit', id, body)

		return edit(platform?.env.comments, 'test', parseInt(id, 10), {
			body,
			date_edited: new Date().toLocaleString(),
		})
	},
	rock: async ({ platform, url }) => {
		const id = url.searchParams.get('id')
		console.log('Rock', id)
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
