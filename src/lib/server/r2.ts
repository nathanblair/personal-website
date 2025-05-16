import type {
	BlogMetadata,
	BlogSlug,
	PaginatedBlogSlugs,
	StorageBlog,
} from '$lib/types/blog'
import { ContentType } from '$lib/types/content.ts'
import type {
	R2Bucket,
	R2ListOptions,
} from '@cloudflare/workers-types/2023-07-01'

export function create(bucket: R2Bucket, key: string, blog: StorageBlog) {
	const customMetadata: BlogMetadata = {
		title: blog.title,
		date: blog.date,
		// @ts-ignore
		commentsEnabled: blog.commentsEnabled.toString(),
	}
	if (blog.dateEdited) customMetadata.dateEdited = blog.dateEdited

	return bucket.put(key, blog.content, {
		httpMetadata: { contentType: blog.contentType },
		// @ts-ignore
		customMetadata,
	})
}

export function remove(bucket: R2Bucket, key: string) {
	return bucket.delete(key)
}

export async function list(bucket: R2Bucket, limit?: number, cursor?: string) {
	let prefix = ''
	const r2ListOptions: R2ListOptions = {
		limit,
		cursor,
		prefix,
		include: ['customMetadata'],
	}
	const r2Blogs = await bucket.list(r2ListOptions)

	if (r2Blogs === undefined) throw new Error('Failed to fetch blogs')

	const blogSlugs: BlogSlug[] = []

	for (const eachBlogHeadObject of r2Blogs.objects) {
		const title =
			eachBlogHeadObject.customMetadata?.title || eachBlogHeadObject.key
		const date = eachBlogHeadObject.customMetadata?.date || 'Unknown'
		const commentsEnabled =
			eachBlogHeadObject.customMetadata?.commentsEnabled === 'true'

		blogSlugs.push({
			title,
			slug: eachBlogHeadObject.key,
			date,
			commentsEnabled,
		})
	}

	const paginatedBlogSlugs: PaginatedBlogSlugs = {
		blogSlugs,
		nextCursor: r2Blogs.truncated ? r2Blogs.cursor : undefined,
		previousCursor: cursor,
		truncated: r2Blogs.truncated,
	}

	return paginatedBlogSlugs
}

export async function get(bucket: R2Bucket, key: string) {
	let blogHead
	try {
		blogHead = await bucket.head(key)
	} catch (err: any) {
		console.error(err)
		throw err
	}

	const date = blogHead?.customMetadata?.date
	if (!date) throw new Error(`Blog '${key}' does not have a date`)
	const dateEdited = blogHead?.customMetadata?.dateEdited

	const title = blogHead?.customMetadata?.title || key
	const commentsEnabled = blogHead?.customMetadata?.commentsEnabled === 'true'

	const rawContentType =
		blogHead?.httpMetadata?.contentType || ContentType.PlainText
	const contentType = rawContentType as ContentType

	let blog = await bucket.get(key)

	if (blog === null) throw new Error(`Blog '${key}' not found`)

	let content = await blog.text()

	const fetchedBlog: StorageBlog = {
		title,
		date,
		dateEdited,
		content,
		commentsEnabled,
		contentType,
	}

	return fetchedBlog
}
