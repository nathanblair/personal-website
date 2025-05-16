import { MyName } from '$lib/constants'
import { list } from '$lib/server/r2'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, url }) => {
	const year = url.searchParams.get('year') || undefined

	const month = url.searchParams.get('month') || undefined
	if (month && !year) error(400, 'Month is only valid if year is present')

	const day = url.searchParams.get('day') || undefined
	if (day && (!year || !month))
		error(400, 'Day is only valid if year and month are present')

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
