import { formatLocaleDateTime } from '$lib/datatime.ts'
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
import { BlogPostingSD } from '$lib/structured_data/blog_posting'
import { me } from '$lib/structured_data/person'
import type { Session } from '$lib/types/auth'
import type { FetchedBlog, StorageBlog } from '$lib/types/blog'
import type { CommentUpdate, NewComment } from '$lib/types/comment.ts'
import type { D1Database, R2Bucket } from '@cloudflare/workers-types'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

async function fetchRocks(
	db: D1Database,
	slug: string,
	userId?: number,
): Promise<Record<string, { count: number; rocked: boolean }>> {
	const comments = await listComments(db, slug)
	const commentIds = comments.map((c) => c.id)
	const rocks = await listByComments(db, commentIds)
	const rockRecords: Record<string, { count: number; rocked: boolean }> = {}

	for (const id of commentIds) {
		const rocksForComment = rocks.filter((r) => r.commentId === id)
		rockRecords[id] = {
			count: rocksForComment.length,
			rocked: rocksForComment.some((rock) => rock.userId === userId),
		}
	}

	return rockRecords
}

async function fetchBlog(slug: string, blogs: R2Bucket) {
	let blog: FetchedBlog
	try {
		blog = await getBlog(blogs, slug)
	} catch (err: any) {
		return error(404, err.message)
	}

	const blogDate = new Date(blog.date)
	const structuredData = new BlogPostingSD(blogDate, blog.title, me)
		.structured_data

	const fetched_blog: StorageBlog = {
		...blog,
		date: blogDate.toISOString(),
		structuredData,
	}
	return fetched_blog
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = (await locals.auth()) as Session

	return {
		description: '',
		blog: await fetchBlog(params.slug, locals.blogs),
		comments: await listComments(locals.db, params.slug),
		rocks: await fetchRocks(locals.db, params.slug, session?.user?.id),
	}
}

export const actions: Actions = {
	removeBlog: async ({ params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		await removeBlog(locals.blogs, params.slug)
		redirect(303, '/blog')
	},
	editBlog: async ({ params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		redirect(303, `/blog/edit/${params.slug}`)
	},
	addComment: async ({ request, params, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		if (!session.user.name) error(404, 'User name not found')

		const formData = await request.formData()

		const locale = formData.get('locale')
		if (!locale) throw new Error('Locale not found')
		const timeZone = formData.get('timeZone')
		if (!timeZone) throw new Error('Time Zone not found')

		const datePosted = formatLocaleDateTime(
			locale.toString(),
			timeZone.toString(),
		)

		const body = formData.get('content')
		if (!body) throw new Error('Comment content not found')

		const comment: NewComment = {
			slug: params.slug,
			userId: session.user?.id,
			userName: session.user.name,
			userImage: session.user.image,
			datePosted,
			body: body.toString(),
		}

		await addComment(locals.db, comment)
		return {}
	},
	deleteComment: async ({ request, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		const formData = await request.formData()
		let commentId: FormDataEntryValue | number | null =
			formData.get('commentId')
		if (!commentId) throw new Error('Comment ID not found')

		commentId = parseInt(commentId?.toString(), 10)

		const existing = await getComment(locals.db, commentId)
		if (!existing) error(404, 'Comment not found')

		if (session.user.id !== existing.userId) error(403, 'Unauthorized')

		await removeComment(locals.db, commentId)
		return
	},
	editComment: async ({ request, locals }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		const formData = await request.formData()
		let commentId: FormDataEntryValue | number | null =
			formData.get('commentId')
		if (!commentId) throw new Error('Comment ID not found')

		commentId = parseInt(commentId?.toString(), 10)

		const existing = await getComment(locals.db, commentId)
		if (!existing) error(404, 'Comment not found')

		if (session.user.id !== existing.userId) error(403, 'Unauthorized')

		const locale = formData.get('locale')
		if (!locale) error(404, 'Locale not found')
		const timeZone = formData.get('timeZone')
		if (!timeZone) error(404, 'Timezone not found')

		const dateEdited = formatLocaleDateTime(
			locale.toString(),
			timeZone.toString(),
		)

		const body = formData.get('body')
		if (!body) error(404, 'Body not found')

		const record: CommentUpdate = { body: body?.toString(), dateEdited }

		await editComment(locals.db, commentId, record)
		return record
	},
	toggleRock: async ({ locals, request }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		const formData = await request.formData()
		let commentId: FormDataEntryValue | number | null =
			formData.get('commentId')
		if (!commentId) throw new Error('Comment ID not found')

		commentId = parseInt(commentId?.toString(), 10)

		const rock = await getRock(locals.db, commentId, session.user.id)
		rock
			? await removeRock(locals.db, rock.id)
			: await addRock(locals.db, { commentId, userId: session.user.id })

		return
	},
}
