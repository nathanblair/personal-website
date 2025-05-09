import { create, get } from '$lib/server/r2'
import type { BlogObject, BlogResponse, Session } from '$lib/types'
import type { R2Bucket } from '@cloudflare/workers-types'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad, RouteParams } from './$types'

async function fetch_blog(params: RouteParams, blogs: R2Bucket) {
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
		date: blog.date,
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

		const title = form_data.get('title')
		if (!title) throw new Error('Blog title not found')

		const locale = form_data.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = form_data.get('timeZone')
		if (!timeZone) throw new Error('Time Zone not found')

		const form_date = form_data.get('date')
		if (!form_date) throw new Error('Blog date not found')

		// const blog_date = new Date(`${date}T00:00`).toDateString()
		const date = new Date(form_date.toString()).toLocaleString(
			locale.toString(),
			{
				timeZone: timeZone.toString(),
			},
		)

		const comments_enabled = form_data.get('comments_enabled')
		if (!comments_enabled) throw new Error('Time Zone not found')

		const content = form_data.get('content')
		if (!content) throw new Error('Blog content not found')

		const content_type = form_data.get('format')?.toString()
		if (!content_type) throw new Error('Blog content type not found')

		const blog: BlogObject = {
			title: title.toString(),
			content: content.toString(),
			date,
			comments_enabled: Boolean(comments_enabled),
		}

		await create(locals.blogs, params.slug, content_type, blog)

		redirect(303, '/blog')
	},
	cancel: async ({ params }) => {
		redirect(303, `/blog/${params.slug}`)
	},
}
