import { MyName } from '$lib/constants'
import { list } from '$lib/server/r2'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, url }) => {
	const currentCursor = url.searchParams.get('cursor') || undefined
	const requestedBlogLimit = url.searchParams.get('limit') || undefined
	let blogCountLimit: number | undefined = undefined
	if (requestedBlogLimit) blogCountLimit = parseInt(requestedBlogLimit, 10)

	return {
		title: 'Blog',
		description: `The blog of ${MyName}`,
		blogs: await list(locals.blogs, blogCountLimit, currentCursor),
	}
}
