import { formatStorageDateTime } from '$lib/datetime'
import { get as getBlog } from '$lib/server/blog.ts'
import {
	add as addComment,
	edit as editComment,
	get as getComment,
	list as listComments,
	remove as removeComment,
} from '$lib/server/comment.ts'
import { Prefix } from '$lib/server/prefix.ts'
import {
	add as addRock,
	get as getRock,
	listByComments,
	remove as removeRock,
} from '$lib/server/rock.ts'
import type { Session } from '$lib/types/auth'
import type { CommentUpdate, NewComment } from '$lib/types/comment.ts'
import type { CommentsRockedState } from '$lib/types/rock.ts'
import type { D1Database } from '@cloudflare/workers-types'
import type { Actions, PageServerLoad } from './$types'

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

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { session, prefix } = await parent()
	const blog = await getBlog(locals.blogs, prefix)
	const title = blog.title
	const comments = await listComments(locals.db, prefix)
	const rocks = await fetchRocks(locals.db, prefix, session?.user?.id)

	return {
		title,
		blog,
		comments,
		rocks,
	}
}

export const actions: Actions = {
	addComment: async ({ request, locals, params }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) throw new Error('Not signed in')

		if (!session.user.name) throw new Error('User name not found')

		const formData = await request.formData()

		const datePosted = formatStorageDateTime()

		const body = formData.get('content')
		if (!body) throw new Error('Comment content not found')

		const blogKey = new Prefix(params).toString()

		const comment: NewComment = {
			blogKey,
			userId: session.user?.id,
			userName: session.user.name,
			userImage: session.user.image,
			datePosted,
			body: body.toString(),
		}

		await addComment(locals.db, comment)
		return
	},
	deleteComment: async ({ locals, url }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) throw new Error('Not signed in')

		let commentId: string | number | null = url.searchParams.get('commentId')
		if (!commentId) throw new Error('Comment ID not found')

		commentId = parseInt(commentId.toString(), 10)

		const existing = await getComment(locals.db, commentId)
		if (!existing) throw new Error('Comment not found')

		if (session.user.id !== existing.userId) throw new Error('Unauthorized')

		await removeComment(locals.db, commentId)
		return
	},
	editComment: async ({ request, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) throw new Error('Not signed in')

		const formData = await request.formData()
		let commentId: FormDataEntryValue | number | null =
			formData.get('commentId')
		if (!commentId) throw new Error('Comment ID not found')

		commentId = parseInt(commentId?.toString(), 10)

		const existing = await getComment(locals.db, commentId)
		if (!existing) throw new Error('Comment not found')

		if (session.user.id !== existing.userId) throw new Error('Unauthorized')

		const dateEdited = formatStorageDateTime()

		const body = formData.get('body')
		if (!body) throw new Error('Body not found')

		const record: CommentUpdate = { body: body.toString(), dateEdited }

		return await editComment(locals.db, commentId, record)
	},
	toggleRock: async ({ locals, request }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) throw new Error('Not signed in')

		const formData = await request.formData()
		let commentId: FormDataEntryValue | number | null =
			formData.get('commentId')
		if (!commentId) throw new Error('Comment ID not found')

		commentId = parseInt(commentId.toString(), 10)

		const rock = await getRock(locals.db, commentId, session.user.id)
		rock
			? await removeRock(locals.db, rock.id)
			: await addRock(locals.db, { commentId, userId: session.user.id })

		return
	},
}
