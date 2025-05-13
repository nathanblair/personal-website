import { edit, read, remove } from '$lib/server/comment.js'
import type { Session } from '$lib/types/auth'
import type { CommentUpdate } from '$lib/types/comments.js'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const actions = {
	edit: async ({ request, url, params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		const id = parseInt(params.id, 10)

		const existing = await read(locals.db, id)
		if (!existing) error(404, 'Comment not found')

		if (session.user.id !== existing.userId) error(403, 'Unauthorized')

		const locale = url.searchParams.get('locale')
		if (!locale) error(404, 'Locale not found')
		const timeZone = url.searchParams.get('timeZone')
		if (!timeZone) error(404, 'Timezone not found')

		const dateEdited = new Date().toLocaleString(locale, { timeZone })

		const j = await request.json()
		const record: CommentUpdate = { body: j.content, dateEdited }

		return edit(locals.db, id, record)
	},
	delete: async ({ params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		const id = parseInt(params.id, 10)

		const existing = await read(locals.db, id)
		if (!existing) error(404, 'Comment not found')

		if (session.user.id !== existing.userId) error(403, 'Unauthorized')

		return remove(locals.db, id)
	},
}
