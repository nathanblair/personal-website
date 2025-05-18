import { MyName } from '$lib/constants.ts'
import { list, prefixes } from '$lib/server/blog'
import type { R2Bucket } from '@cloudflare/workers-types'
import type { LayoutServerLoad } from './$types'

type PrefixParams = { prefix: string; delimiter: string }

function buildPrefixParams(
	year?: string,
	month?: string,
	day?: string,
): PrefixParams {
	let prefix = ''
	const delimiter = '/'
	if (!year) return { prefix, delimiter }

	prefix = `${year}/`
	if (year && month) prefix += `${month}/`
	if (year && month && day) prefix += `${day}`
	return { prefix, delimiter }
}

async function destructurePrefixes(
	blogs: R2Bucket,
	prefixParams: PrefixParams,
) {
	const pres = await prefixes(
		blogs,
		prefixParams.prefix,
		prefixParams.delimiter,
	)

	const destructured = pres.map((eachPrefix) =>
		eachPrefix.split('/').filter(Boolean),
	)
	return destructured
}

export const load: LayoutServerLoad = async ({ url, locals, params }) => {
	const currentCursor = url.searchParams.get('cursor') || undefined
	const requestedBlogLimit = url.searchParams.get('limit') || undefined
	let blogCountLimit: number | undefined = undefined
	if (requestedBlogLimit) blogCountLimit = parseInt(requestedBlogLimit, 10)

	const prefixParams = buildPrefixParams(params.year, params.month, params.day)

	return {
		title: 'Blog',
		description: `The blog of ${MyName}`,
		currentCursor,
		blogCountLimit,
		blogScopes: await destructurePrefixes(locals.blogs, prefixParams),
		blogs: await list(
			locals.blogs,
			blogCountLimit,
			currentCursor,
			prefixParams.prefix,
		),
	}
}
