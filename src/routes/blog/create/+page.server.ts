import { create, formatKey } from '$lib/server/blog'
import type { Session } from '$lib/types/auth'
import type { StorageBlog } from '$lib/types/blog'
import type { ContentType } from '$lib/types/content.ts'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const session = (await locals.auth()) as Session
	if (!session) error(404, 'Not signed in')

	if (!session.user?.admin) error(403, 'Unauthorized')

	return { title: `Create Blog Post`, description: `Create a blog post` }
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (!session.user?.admin) throw new Error('Unauthorized')

		const formData = await request.formData()

		const title = formData.get('title')?.toString()
		if (!title) throw new Error('Blog title not found')

		const locale = formData.get('locale')?.toString()
		if (!locale) throw new Error('Locale not found')
		const timeZone = formData.get('timeZone')?.toString()
		if (!timeZone) throw new Error('Time Zone not found')

		const formDate = formData.get('date')?.toString()
		if (!formDate) throw new Error('Blog date not found')

		const date = new Date(formDate).toISOString()

		const commentsEnabled = formData.get('commentsEnabled')
		if (!commentsEnabled) throw new Error('Comments enabled not found')

		const content = formData.get('content')?.toString()
		if (!content) throw new Error('Blog content not found')

		const rawContentType: string | ContentType | undefined = formData
			.get('contentType')
			?.toString()
		if (!rawContentType) throw new Error('Blog content type not found')
		const contentType: ContentType = rawContentType as ContentType

		const blog: StorageBlog = {
			title,
			date,
			contentType,
			content,
			commentsEnabled: Boolean(commentsEnabled),
		}

		const blogKey = formatKey(date)

		await create(locals.blogs, blogKey, blog)

		redirect(303, `/blog/${blogKey}`)
	},
}
