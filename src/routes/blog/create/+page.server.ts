import { create } from '$lib/server/r2'
import type { BlogObject, Session } from '$lib/types'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
	const title = `Create Blog Post`
	const description = `Create a blog post`

	return { title, description }
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		const form_data = await request.formData()

		const title = form_data.get('title')
		if (!title) throw new Error('Blog title not found')

		const locale = form_data.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = form_data.get('timeZone')
		if (!timeZone) throw new Error('Time Zone not found')

		const date = new Date().toLocaleString(locale.toString(), {
			timeZone: timeZone.toString(),
		})

		const comments_enabled = form_data.get('comments_enabled')
		if (!comments_enabled) throw new Error('Time Zone not found')

		const content = form_data.get('content')
		if (!content) throw new Error('Blog content not found')

		const content_type = form_data.get('format')
		if (!content_type) throw new Error('Blog content type not found')

		const formatted_title = title.toString().replace(/ /g, '-')
		const key = `${formatted_title.toLowerCase()}-${Date.now().toString(36)}`

		const blog: BlogObject = {
			title: title.toString(),
			content: content.toString(),
			date,
			comments_enabled: Boolean(comments_enabled),
		}

		await create(locals.blogs, key, content_type.toString(), blog)

		redirect(303, '/blog')
	},
}
