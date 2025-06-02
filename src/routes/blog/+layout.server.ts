import { MyName } from '$lib/constants.ts'
import { entries, list } from '$lib/server/blog.ts'
import { list as listComments } from '$lib/server/comment.ts'
import { Prefix } from '$lib/server/prefix.ts'
import { listByComments } from '$lib/server/rock.ts'
import { Scope } from '$lib/server/scope.ts'
import type { BlogSlug } from '$lib/types/blog.ts'
import type { CommentsRockedState } from '$lib/types/rock.ts'
import type { D1Database } from '@cloudflare/workers-types'
import type { LayoutServerLoad } from './$types'

async function fetchRocks(
	db: D1Database,
	slug: string,
	userId?: number,
): Promise<CommentsRockedState> {
	const comments = await listComments(db, slug)
	const commentIds = comments.map((c) => c.id)
	const rocks = await listByComments(db, commentIds)
	const commentsRockedState: CommentsRockedState = {}

	for (const id of commentIds) {
		const rocksForComment = rocks.filter((r) => r.commentId === id)
		commentsRockedState[id] = {
			count: rocksForComment.length,
			rocked: rocksForComment.some((rock) => rock.userId === userId),
		}
	}

	return commentsRockedState
}

export const load: LayoutServerLoad = async ({
	url,
	locals,
	params,
	parent,
}) => {
	const { session } = await parent()

	let title = 'Blog'

	const currentCursor = url.searchParams.get('cursor') || undefined
	const requestedBlogLimit = url.searchParams.get('limit') || undefined
	let countLimit: number | undefined = undefined
	if (requestedBlogLimit) countLimit = parseInt(requestedBlogLimit, 10)

	const scope = new Scope(params)
	const prefix = new Prefix(scope).toString()
	const crumbs = scope.toAnchorProps()
	const keys = await entries(locals.blogs, prefix)
	const prefixesAtScope = keys.map((eachKey) => eachKey.toAnchorProp())

	let slugs: BlogSlug[] = []
	if (!scope.slug) {
		const blogs = await list(locals.blogs, countLimit, currentCursor, prefix)
		slugs = blogs.slugs
	}

	return {
		title,
		description: `The blog of ${MyName}`,
		currentCursor,
		countLimit,
		prefix,
		prefixesAtScope,
		crumbs,
		slugs,
	}
}
