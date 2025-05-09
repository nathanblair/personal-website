import type {
	BlogHead,
	BlogListResponse,
	BlogObject,
	BlogResponse,
} from '$lib/types'
import type { R2Bucket, R2Object } from '@cloudflare/workers-types'

export function create(
	bucket: R2Bucket,
	key: string,
	content_type: string,
	blog: BlogObject,
) {
	return bucket.put(key, blog.content, {
		httpMetadata: { contentType: content_type },
		customMetadata: {
			title: blog.title,
			date: blog.date,
			comments_enabled: blog.comments_enabled.toString(),
		},
	})
}

export function remove(bucket: R2Bucket, key: string) {
	return bucket.delete(key)
}

export async function list(bucket: R2Bucket): Promise<BlogListResponse> {
	const r2_blogs = await bucket.list({})

	if (r2_blogs === undefined) throw new Error('Failed to fetch blogs')

	const blog_heads: BlogHead[] = []

	let each_blog_head: R2Object | null, title, date, comments_enabled
	for (const each_blog_head_object of r2_blogs.objects) {
		each_blog_head = await bucket.head(each_blog_head_object.key)

		title = each_blog_head?.customMetadata?.title || each_blog_head_object.key
		date = each_blog_head?.customMetadata?.date || 'Unknown'
		comments_enabled =
			each_blog_head?.customMetadata?.comments_enabled === 'true'

		blog_heads.push({
			title,
			url: `/blog/${each_blog_head_object.key}`,
			date,
			comments_enabled,
		})
	}

	return { blogs: blog_heads, status: 200, headers: new Headers() }
}

export async function get(
	bucket: R2Bucket,
	key: string,
	raw: boolean = true,
): Promise<BlogResponse> {
	let blog_head
	try {
		blog_head = await bucket.head(key)
	} catch (err: any) {
		console.error(err)
		throw err
	}

	const date = blog_head?.customMetadata?.date
	if (!date) throw new Error(`Blog '${key}' does not have a date`)
	const title = blog_head?.customMetadata?.title || key
	const comments_enabled =
		blog_head?.customMetadata?.comments_enabled === 'true'

	let blog = await bucket.get(key)

	if (blog === null) throw new Error(`Blog '${key}' not found`)

	let content = await blog.text()

	// if (raw && blog.httpMetadata?.contentType === 'text/markdown') {
	// 	content = await transcribe_markdown(content)
	// }

	const headers = new Headers({
		'Content-Type': blog.httpMetadata?.contentType || 'text/plain',
		'Cache-Control': blog.httpMetadata?.cacheControl || 'no-cache',
	})

	return {
		blog: { title, date, content, comments_enabled },
		status: 200,
		headers,
	}
}
