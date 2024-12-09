import {
	create,
	get,
	type BlogObject,
	type BlogResponse,
} from '$lib/server/blog/api'
import type { Session } from '$lib/types'
import type { R2Bucket } from '@cloudflare/workers-types'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

async function fetch_blog(
	params: import('./$types').RouteParams,
	blogs: R2Bucket,
) {
	let blog_response: BlogResponse
	try {
		blog_response = await get(blogs, params.slug, false)
	} catch (err: any) {
		return error(404, err.message)
	}

	const blog = blog_response.blog
	const headers = blog_response.headers

	const blog_date = new Date(blog.date)
	const blog_year = blog_date.getFullYear()
	const blog_month_number = blog_date.getMonth() + 1
	const blog_month = new String(blog_month_number).padStart(2, '0')
	const blog_day_number = blog_date.getDate()
	const blog_day = new String(blog_day_number).padStart(2, '0')
	const date = `${blog_year}-${blog_month}-${blog_day}`

	return {
		blog_title: blog.title,
		date,
		content: blog.content,
		comments_enabled: blog.comments_enabled,
		content_type: headers?.get('Content-Type'),
	}
}

export const load: PageServerLoad = ({ params, locals }) => {
	const title = `Edit Blog Post`
	const description = `Edit a blog post`

	return { title, description, blog_fetch: fetch_blog(params, locals.blogs) }
}

export const actions: Actions = {
	update: async ({ request, params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		const form_data = await request.formData()

		const blog_title = form_data.get('title')?.toString()
		if (blog_title === undefined) throw new Error('Blog title not found')

		const date = form_data.get('date')?.toString()
		if (date === undefined) throw new Error('Blog date not found')
		const blog_date = new Date(`${date}T00:00`).toDateString()

		const comments_enabled = Boolean(form_data.get('comments'))

		const blog_content = form_data.get('content')?.toString()
		if (blog_content === undefined) throw new Error('Blog content not found')

		const content_type = form_data.get('format')?.toString()
		if (content_type === undefined)
			throw new Error('Blog content type not found')

		const blog: BlogObject = {
			title: blog_title,
			date: blog_date,
			content: blog_content,
			comments_enabled,
		}

		await create(locals.blogs, params.slug, content_type, blog)

		redirect(303, '/blog')
	},
	cancel: async () => {
		redirect(303, '/blog')
	},
}
