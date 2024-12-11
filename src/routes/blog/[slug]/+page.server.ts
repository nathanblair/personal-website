import { comments_table_name } from '$lib/constants.ts'
import { get, remove, type BlogResponse } from '$lib/server/blog/api'
import { BlogPosting } from '$lib/structured_data/blog_posting'
import { my_person } from '$lib/structured_data/person'
import type { Session } from '$lib/types'
import type { R2Bucket } from '@cloudflare/workers-types'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

async function fetch_comments(
	fetch: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
		(
			input: string | URL | globalThis.Request,
			init?: RequestInit,
		): Promise<Response>
	},
	slug: string,
) {
	const comments_request = await fetch(`/api/${comments_table_name}/${slug}`)
	const comments = await comments_request.json()
	return comments
}

async function fetch_blog(slug: string, blogs: R2Bucket) {
	let blog_response: BlogResponse
	try {
		blog_response = await get(blogs, slug)
	} catch (err: any) {
		return error(404, err.message)
	}

	const blog = blog_response.blog
	const headers = blog_response.headers
	const blog_date = new Date(blog.date)
	const structured_data = new BlogPosting(blog_date, blog.title, my_person)
		.structured_data

	return {
		title: blog.title,
		date: blog.date,
		content: blog.content,
		comments_enabled: blog.comments_enabled,
		content_type: headers?.get('Content-Type'),
		structured_data,
	}
}

export const load: PageServerLoad = async ({ params, locals, fetch }) => {
	return {
		description: '',
		blog_fetch: fetch_blog(params.slug, locals.blogs),
		comments: fetch_comments(fetch, params.slug),
	}
}

export const actions: Actions = {
	remove: async ({ params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		await remove(locals.blogs, params.slug)
		redirect(303, '/blog')
	},
	edit: async ({ params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		redirect(303, `/blog/edit/${params.slug}`)
	},
}
