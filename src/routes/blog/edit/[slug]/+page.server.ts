import { create, get } from '$lib/server/r2'
import type { Session } from '$lib/types/auth'
import type { BlogPost, FetchedBlog } from '$lib/types/blog'
import type { R2Bucket } from '@cloudflare/workers-types'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

async function fetchBlog(slug: string, blogs: R2Bucket) {
	let blog: FetchedBlog
	try {
		blog = await get(blogs, slug)
	} catch (err: any) {
		return error(404, err.message)
	}

	return blog
}

export const load: PageServerLoad = ({ params, locals }) => {
	const title = `Edit Blog Post`
	const description = `Edit a blog post`

	return {
		title,
		description,
		blogFetch: fetchBlog(params.slug, locals.blogs),
	}
}

export const actions: Actions = {
	update: async ({ request, params, locals }) => {
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

		const formDate = formData.get('date')
		if (!formDate) throw new Error('Blog date not found')

		// const blogDate = new Date(`${date}T00:00`).toDateString()
		const date = new Date(formDate.toString()).toLocaleString(
			locale.toString(),
			{ timeZone: timeZone.toString() },
		)

		const commentsEnabled = formData.get('commentsEnabled')
		if (!commentsEnabled) throw new Error('Time Zone not found')

		const content = formData.get('content')
		if (!content) throw new Error('Blog content not found')

		const contentType = formData.get('format')?.toString()
		if (!contentType) throw new Error('Blog content type not found')

		const blog: BlogPost = {
			title: title.toString(),
			date,
			commentsEnabled: Boolean(commentsEnabled),
			content: content.toString(),
		}

		await create(locals.blogs, params.slug, contentType, blog)

		redirect(303, '/blog')
	},
	cancel: async ({ params }) => {
		redirect(303, `/blog/${params.slug}`)
	},
}
