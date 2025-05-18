import { MyName } from '$lib/constants.ts'
import { list, prefixes } from '$lib/server/blog'
import type { LayoutServerLoad } from './$types'

function buildPrefix(year?: string, month?: string, day?: string) {
	if (!year) return ''

	let prefix = `${year}/`
	if (year && month) prefix += `${month}/`
	if (year && month && day) prefix += `${day}/`
	return prefix
}

export const load: LayoutServerLoad = async ({ url, locals, params }) => {
	const currentCursor = url.searchParams.get('cursor') || undefined
	const requestedBlogLimit = url.searchParams.get('limit') || undefined
	let blogCountLimit: number | undefined = undefined
	if (requestedBlogLimit) blogCountLimit = parseInt(requestedBlogLimit, 10)

	const prefix = buildPrefix(params.year, params.month, params.day)

	return {
		title: 'Blog',
		description: `The blog of ${MyName}`,
		currentCursor,
		blogCountLimit,
		blogScope: await prefixes(locals.blogs, prefix, '/'),
		blogs: await list(locals.blogs, blogCountLimit, currentCursor, prefix),
	}
}
