import { formatStorageDateTime } from '$lib/datetime.ts'
import { create, formatKey, get } from '$lib/server/blog'
import { remove } from '$lib/server/r2.ts'
import type { Session } from '$lib/types/auth'
import type { StorageBlog } from '$lib/types/blog'
import { ContentType } from '$lib/types/content.ts'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals, parent }) => {
	const { session } = await parent()
	if (!session) error(404, 'Not signed in')

	if (!session.user?.admin) error(403, 'Unauthorized')

	return {
		title: `Edit Blog Post`,
		description: `Edit a blog post`,
		blog: await get(locals.blogs, params.slug),
	}
}

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (!session.user?.admin) throw new Error('Unauthorized')

		const formData = await request.formData()

		const title = formData.get('title')?.toString()
		if (!title) throw new Error('Blog title not found')

		const formDateTime = formData.get('datetime')
		if (!formDateTime) throw new Error('Blog date not found')

		const dateTime = formatStorageDateTime(formDateTime.toString())
		const dateEdited = formatStorageDateTime()

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
			date: dateTime,
			dateEdited,
			contentType,
			content,
			commentsEnabled: Boolean(commentsEnabled),
		}

		const blogKey = formatKey(dateTime)
		await remove(locals.blogs, params.slug)
		await create(locals.blogs, blogKey, blog)

		redirect(303, `/blog/${blogKey}`)
	},
}
