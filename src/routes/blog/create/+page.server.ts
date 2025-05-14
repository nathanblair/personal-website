import { formatLocaleDateTime } from '$lib/datatime.ts'
import { create } from '$lib/server/r2'
import type { Session } from '$lib/types/auth'
import type { BlogPost } from '$lib/types/blog'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
	const title = `Create Blog Post`
	const description = `Create a blog post`

	return { title, description }
}

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		const formData = await request.formData()

		const title = formData.get('title')
		if (!title) throw new Error('Blog title not found')

		const locale = formData.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = formData.get('timeZone')
		if (!timeZone) throw new Error('Time Zone not found')

		const date = formatLocaleDateTime(locale.toString(), timeZone.toString())

		// FIXME Comments enabled is breaking
		// when comments are not enabled
		const commentsEnabled = formData.get('commentsEnabled')
		if (!commentsEnabled) throw new Error('Comments enabled not found')

		const content = formData.get('content')
		if (!content) throw new Error('Blog content not found')

		// FIXME Content type is breaking
		// Its not grabbing the value from the Combobox, only the label
		const contentType = formData.get('contentType')
		if (!contentType) throw new Error('Blog content type not found')

		const formattedTitle = title.toString().replace(/ /g, '-')
		const key = `${formattedTitle.toLowerCase()}-${Date.now().toString(36)}`

		const blog: BlogPost = {
			title: title.toString(),
			content: content.toString(),
			date,
			commentsEnabled: Boolean(commentsEnabled),
		}

		await create(locals.blogs, key, contentType.toString(), blog)

		redirect(303, '/blog')
	},
	cancel: async ({}) => {
		redirect(303, '/blog')
	},
}
