import { MyName } from '$lib/constants.ts'
import { entries, list } from '$lib/server/blog.ts'
import { Prefix } from '$lib/server/prefix.ts'
import { Scope } from '$lib/server/scope.ts'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ url, locals, params }) => {
	const currentCursor = url.searchParams.get('cursor') || undefined
	const requestedBlogLimit = url.searchParams.get('limit') || undefined
	let countLimit: number | undefined = undefined
	if (requestedBlogLimit) countLimit = parseInt(requestedBlogLimit, 10)

	const scope = Scope.fromParams(params)
	console.log('scope', scope)
	const crumbs = scope.toAnchorProps()
	console.log('crumbs', crumbs)
	const prefix = Prefix.fromScope(scope)
	console.log('prefix', prefix)
	const keys = await entries(locals.blogs, prefix.toString())

	console.log('keys', keys)
	const prefixesAtScope = keys.map((eachKey) => eachKey.toAnchorProp())

	const blogs = await list(
		locals.blogs,
		countLimit,
		currentCursor,
		prefix.toString(),
	)

	return {
		title: 'Blog',
		description: `The blog of ${MyName}`,
		currentCursor,
		countLimit,
		prefixesAtScope,
		crumbs,
		slugs: blogs.slugs,
	}
}
