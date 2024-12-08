import { name } from '$lib/constants'
import { list } from '$lib/server/blog/api'
import type { R2Bucket } from '@cloudflare/workers-types'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

async function fetch_blogs(blogs: R2Bucket) {
	let blog_list_response: import("$lib/server/blog/api").BlogListResponse
	try {
		blog_list_response = await list(blogs)
	} catch (err: any) {
		console.error(err)
		return error(500, err)
	}

	blog_list_response.blogs.sort(
		(
			a: { date: string | number | Date },
			b: { date: string | number | Date }
		) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	)

	return blog_list_response.blogs
}

export const load: PageServerLoad = ({ locals }) => {
	return {
		title: 'Blog',
		description: `The blog of ${name}`,
		blogs_fetch: fetch_blogs(locals.blogs),
	}
}
