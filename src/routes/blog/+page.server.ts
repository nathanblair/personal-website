import { name } from '$lib/constants'
import { list } from '$lib/server/r2'
import type { R2Bucket } from '@cloudflare/workers-types'
import type { PageServerLoad } from './$types'

async function fetch_blogs(blogs: R2Bucket) {
	const blog_list_response = await list(blogs)

	blog_list_response.blogs.sort(
		(
			a: { date: string | number | Date },
			b: { date: string | number | Date },
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
