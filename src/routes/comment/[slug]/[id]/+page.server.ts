import { formatLocaleDateTime } from '$lib/datatime.js'
import { edit, read, remove } from '$lib/server/comment.js'
import type { Session } from '$lib/types/auth'
import type { CommentUpdate } from '$lib/types/comment.js'
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

		const formData = await request.formData()

		const locale = formData.get('locale')
		if (!locale) error(404, 'Locale not found')
		const timeZone = formData.get('timeZone')
		if (!timeZone) error(404, 'Timezone not found')

		const dateEdited = formatLocaleDateTime(
			locale.toString(),
			timeZone.toString(),
		)

		const body = formData.get('body')
		if (!body) error(404, 'Body not found')

		const record: CommentUpdate = { body: body?.toString(), dateEdited }

		await edit(locals.db, id, record)
		return
	},
	delete: async ({ params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		const id = parseInt(params.id, 10)

		const existing = await read(locals.db, id)
		if (!existing) error(404, 'Comment not found')

		if (session.user.id !== existing.userId) error(403, 'Unauthorized')

		await remove(locals.db, id)
		return
	},
}
