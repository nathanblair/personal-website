import { MyName } from '$lib/constants'
import { list } from '$lib/server/r2'
import type { R2Bucket } from '@cloudflare/workers-types'
import type { PageServerLoad } from './$types'

async function fetchBlogs(blogs: R2Bucket) {
	const blogList = await list(blogs)

	blogList.sort(
		(
			a: { date: string | number | Date },
			b: { date: string | number | Date },
		) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	)

	return blogList
}

export const load: PageServerLoad = ({ locals }) => {
	return {
		title: 'Blog',
		description: `The blog of ${MyName}`,
		blogsFetch: fetchBlogs(locals.blogs),
	}
}
