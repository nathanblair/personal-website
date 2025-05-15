import type { BlogMetadata, BlogSlug, StorageBlog } from '$lib/types/blog'
import { ContentType } from '$lib/types/content.ts'
import type { R2Bucket, R2Object } from '@cloudflare/workers-types'

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

export async function list(bucket: R2Bucket) {
	const r2Blogs = await bucket.list({})

	if (r2Blogs === undefined) throw new Error('Failed to fetch blogs')

	const blogHeads: BlogSlug[] = []

	let eachBlogHead: R2Object | null, title, date, commentsEnabled
	for (const eachBlogHeadObject of r2Blogs.objects) {
		eachBlogHead = await bucket.head(eachBlogHeadObject.key)

		title = eachBlogHead?.customMetadata?.title || eachBlogHeadObject.key
		date = eachBlogHead?.customMetadata?.date || 'Unknown'
		commentsEnabled = eachBlogHead?.customMetadata?.commentsEnabled === 'true'

		blogHeads.push({
			title,
			slug: eachBlogHeadObject.key,
			date,
			commentsEnabled,
		})
	}

	return blogHeads
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
