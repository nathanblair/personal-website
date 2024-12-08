import { comments_table_name, rocks_table_name } from '$lib/constants'
import { get, remove, type BlogResponse } from '$lib/server/blog/api'
import { has } from '$lib/server/d1'
import { BlogPosting } from '$lib/structured_data/blog_posting'
import { my_person } from '$lib/structured_data/person'
import type { R2Bucket } from '@cloudflare/workers-types'
import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

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

export const load: PageServerLoad = async ({ params, locals }) => {
	const comments_initialized = await has(locals.db, comments_table_name)
	const rocks_initialized = await has(locals.db, rocks_table_name)

	return {
		description: '',
		blog_fetch: fetch_blog(params.slug, locals.blogs),
		comments_initialized,
		rocks_initialized,
		comments: locals.db
			? await fetch(`/comment/${params.slug}`)
			: Promise.resolve({ results: [] }),
	}
}

export const actions: import('./$types').Actions = {
	remove: async ({ params, locals }) => {
		await remove(locals.blogs, params.slug)
		redirect(303, '/blog')
	},
	edit: ({ params }) => {
		redirect(303, `/blog/edit/${params.slug}`)
	},
}
