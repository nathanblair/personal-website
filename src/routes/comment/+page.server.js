import { add, clean, edit, init, remove } from '$lib/server/comments/api.js'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const actions = {
	submit: async ({ platform, locals, request, url }) => {
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

		const locale = url.searchParams.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = url.searchParams.get('timeZone')
		if (!timeZone) throw new Error('Timezone not found')

		const date_posted = new Date().toLocaleString(locale, { timeZone })
		console.log(date_posted)

		return add(platform?.env.comments, 'test', {
			user_id,
			user_name,
			user_image,
			user_email,
			date_posted,
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

		const locale = url.searchParams.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = url.searchParams.get('timeZone')
		if (!timeZone) throw new Error('Timezone not found')

		const date_edited = new Date().toLocaleString(locale, { timeZone })
		console.log('Edit', id, body, date_edited)

		return edit(platform?.env.comments, 'test', parseInt(id, 10), {
			body,
			date_edited,
		})
	},
	rock: async ({ platform, url }) => {
		const id = url.searchParams.get('id')
		console.log('Rock', id)
	},
	clean: async ({ platform, url }) => {
		if (!platform?.env.comments) error(500, 'Comments not initialized')
		const slug = url.searchParams.get('slug')
		if (!slug) error(500, 'Slug not found')

		await clean(platform?.env.comments, slug)
		return
	},
	init: async ({ platform, url }) => {
		if (!platform?.env.comments) error(500, 'Comments not initialized')
		const slug = url.searchParams.get('slug')
		if (!slug) error(500, 'Slug not found')

		await init(platform?.env.comments, slug)
		return
	},
}
