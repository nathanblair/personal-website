import type { BlogPost, BlogSlug, FetchedBlog } from '$lib/types/blog'
import type { R2Bucket, R2Object } from '@cloudflare/workers-types'

export function create(
	bucket: R2Bucket,
	key: string,
	contentType: string,
	blog: BlogPost,
) {
	return bucket.put(key, blog.content, {
		httpMetadata: { contentType: contentType },
		customMetadata: {
			title: blog.title,
			date: blog.date,
			commentsEnabled: blog.commentsEnabled.toString(),
		},
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
			commentsEnabled: commentsEnabled,
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
	const title = blogHead?.customMetadata?.title || key
	const commentsEnabled = blogHead?.customMetadata?.commentsEnabled === 'true'
	const contentType = blogHead?.httpMetadata?.contentType || 'text/plain'

	let blog = await bucket.get(key)

	if (blog === null) throw new Error(`Blog '${key}' not found`)

	let content = await blog.text()

	const fetchedBlog: FetchedBlog = {
		title,
		date,
		content,
		commentsEnabled,
		contentType,
	}

	return fetchedBlog
}
