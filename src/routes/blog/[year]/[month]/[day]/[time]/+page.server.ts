import { formatStorageDateTime } from '$lib/datetime'
import {
	add as addComment,
	edit as editComment,
	get as getComment,
	list as listComments,
	remove as removeComment,
} from '$lib/server/comment.ts'
import { get as getBlog, remove as removeBlog } from '$lib/server/r2'
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
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad, RouteParams } from './$types'

function routeToBlogKey(params: RouteParams) {
	return `${params.year}/${params.month}/${params.day}/${params.time}`
}

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

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = (await locals.auth()) as Session

	const blogKey = routeToBlogKey(params)

	return {
		description: '',
		blog: await getBlog(locals.blogs, blogKey),
		comments: await listComments(locals.db, blogKey),
		rocks: await fetchRocks(locals.db, blogKey, session?.user?.id),
	}
}

export const actions: Actions = {
	removeBlog: async ({ params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (!session.user?.admin) throw new Error('Unauthorized')

		const blogKey = routeToBlogKey(params)
		await removeBlog(locals.blogs, blogKey)
		redirect(303, '/blog')
	},
	addComment: async ({ request, params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) throw new Error('Not signed in')

		if (!session.user.name) throw new Error('User name not found')

		const formData = await request.formData()

		const locale = formData.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = formData.get('timeZone')
		if (!timeZone) throw new Error('Time Zone not found')

		const datePosted = formatStorageDateTime()

		const body = formData.get('content')
		if (!body) throw new Error('Comment content not found')

		const comment: NewComment = {
			slug: routeToBlogKey(params),
			userId: session.user?.id,
			userName: session.user.name,
			userImage: session.user.image,
			datePosted,
			body: body.toString(),
		}

		await addComment(locals.db, comment)
		return {}
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

		const locale = formData.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = formData.get('timeZone')
		if (!timeZone) throw new Error('Timezone not found')

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
