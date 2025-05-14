import { list as listComments } from '$lib/server/comment.ts'
import { get, remove } from '$lib/server/r2'
import { list as listRocks } from '$lib/server/rock.ts'
import { BlogPostingSD } from '$lib/structured_data/blog_posting'
import { me } from '$lib/structured_data/person'
import type { Session } from '$lib/types/auth'
import type { FetchedBlog, StorageBlog } from '$lib/types/blog'
import type { D1Database, R2Bucket } from '@cloudflare/workers-types'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

async function fetchRocks(
	db: D1Database,
	slug: string,
): Promise<Record<string, { count: number; rocked: boolean }>> {
	let rockRecords: Record<string, { count: number; rocked: boolean }> = {}

	const comments = await listComments(db, slug)
	for (const eachComment of comments) {
		const rocks = await listRocks(db, eachComment.id)
		rockRecords[eachComment.id] = {
			count: rocks.length,
			rocked: false,
		}
	}

	return rockRecords
}

async function fetchBlog(slug: string, blogs: R2Bucket) {
	let blog: FetchedBlog
	try {
		blog = await get(blogs, slug)
	} catch (err: any) {
		return error(404, err.message)
	}

	const blogDate = new Date(blog.date)
	const structuredData = new BlogPostingSD(blogDate, blog.title, me)
		.structured_data

	const fetched_blog: StorageBlog = {
		...blog,
		date: blogDate.toISOString(),
		structuredData,
	}
	return fetched_blog
}

export const load: PageServerLoad = async ({ params, locals }) => {
	return {
		description: '',
		blog: fetchBlog(params.slug, locals.blogs),
		comments: listComments(locals.db, params.slug),
		rocks: fetchRocks(locals.db, params.slug),
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
