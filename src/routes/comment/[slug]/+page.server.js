import {
	add,
	clean,
	edit,
	init,
	remove,
	retrieve,
} from '$lib/server/comments/api.js'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const actions = {
	submit: async ({ platform, locals, request, url, params }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		const session = await locals.auth()
		if (!session) error(404, 'Not signed in')

		const user_id = session.user?.id
		if (!user_id) error(404, 'User id not found')
		const user_name = session.user?.name
		if (!user_name) error(404, 'User name not found')
		const user_image = session.user?.image

		const form = await request.formData()
		const comment = form.get('comment')?.toString()
		if (!comment) throw new Error('Comment not found')

		const locale = url.searchParams.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = url.searchParams.get('timeZone')
		if (!timeZone) throw new Error('Timezone not found')

		const date_posted = new Date().toLocaleString(locale, { timeZone })

		return add(platform?.env.db, {
			slug: params.slug,
			user_id,
			user_name,
			user_image,
			date_posted,
			body: comment,
		})
	},
	delete: async ({ platform, url, locals }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		/** @type {Session | null} */
		const session = await locals.auth()
		if (!session) error(404, 'Not signed in')

		const user_id = url.searchParams.get('user_id')
		if (!user_id) error(500, 'User ID not found')

		if (session.user?.id?.toString() !== user_id || !session.user?.admin)
			error(403, 'Unauthorized')

		const id = url.searchParams.get('id')
		if (!id) error(500, 'Comment id invalid')

		return remove(platform?.env.db, parseInt(id, 10))
	},
	edit: async ({ platform, request, url, locals }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		const session = await locals.auth()
		if (!session) error(404, 'Not signed in')

		const user_id = url.searchParams.get('user_id')
		if (!user_id) error(500, 'User ID not found')

		if (session.user?.id?.toString() !== user_id) error(403, 'Unauthorized')

		const formData = await request.formData()
		const body = formData.get('body')?.toString()
		if (!body) error(500, 'Comment body not found')

		const id = url.searchParams.get('id')?.toString()
		if (!id) error(500, 'Comment ID not found')

		const locale = url.searchParams.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = url.searchParams.get('timeZone')
		if (!timeZone) throw new Error('Timezone not found')

		return edit(platform?.env.db, parseInt(id, 10), {
			body,
			date_edited: new Date().toLocaleString(locale, { timeZone }),
		})
	},
	rock: async ({ platform, url }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		const id = url.searchParams.get('id')
		if (!id) error(500, 'Comment ID not found')

		const user_id = url.searchParams.get('user_id')
		if (!user_id) error(500, 'User ID not found')

		const rocked = url.searchParams.get('rocked')
		if (!rocked) error(500, 'Could not determine rock status')

		const current_comment = await retrieve(platform?.env.db, parseInt(id))

		const is_rocked = rocked === 'true'
		// const current_rocks = current_comment.results[0].rocks
		const current_rocks = 0
		const rocks = is_rocked ? current_rocks + 1 : current_rocks - 1

		console.log('Rock', id, user_id, rocked, rocks)

		// return edit(platform?.env.comments, 'test', parseInt(id, 10), { rocks })
	},
	clean: async ({ platform, locals }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		/** @type {Session | null} */
		const session = await locals.auth()
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		await clean(platform?.env.db)
		return
	},
	init: async ({ platform, locals }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		/** @type {Session | null} */
		const session = await locals.auth()
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		await init(platform?.env.db)
		return
	},
}
