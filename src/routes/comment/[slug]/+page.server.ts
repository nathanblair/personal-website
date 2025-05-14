import { formatLocaleDateTime } from '$lib/datatime.js'
import { add } from '$lib/server/comment.js'
import type { Session } from '$lib/types/auth.js'
import type { NewComment } from '$lib/types/comment.js'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const actions = {
	submit: async ({ request, url, params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		if (!session.user.name) error(404, 'User name not found')

		const formData = await request.formData()

		const locale = formData.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = formData.get('timeZone')
		if (!timeZone) throw new Error('Time Zone not found')

		const datePosted = formatLocaleDateTime(
			locale.toString(),
			timeZone.toString(),
		)

		const body = formData.get('content')
		if (!body) throw new Error('Comment content not found')

		const comment: NewComment = {
			slug: params.slug,
			userId: session.user?.id,
			userName: session.user.name,
			userImage: session.user.image,
			datePosted,
			body: body.toString(),
		}

		await add(locals.db, comment)
		return
	},
}
