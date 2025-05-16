import { MyName } from '$lib/constants.ts'
import { list } from '$lib/server/r2.ts'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ url, locals, params }) => {
	const currentCursor = url.searchParams.get('cursor') || undefined
	const requestedBlogLimit = url.searchParams.get('limit') || undefined
	let blogCountLimit: number | undefined = undefined
	if (requestedBlogLimit) blogCountLimit = parseInt(requestedBlogLimit, 10)

	const prefix = `${params.year}/${params.month}/${params.day}/`
	console.log('prefix', prefix)

	return {
		title: 'Blog',
		description: `The blog of ${MyName}`,
		currentCursor,
		blogCountLimit,
		blogs: await list(locals.blogs, blogCountLimit, currentCursor, prefix),
	}
}
