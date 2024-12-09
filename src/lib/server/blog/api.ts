import { transcribe_markdown } from '../github'

type Blog = { title: string; date: string; comments_enabled: boolean }

type BlogHead = Blog & { url: string }
type BlogContent = Blog & { content: string }

export type BlogObject = Blog & { content: string }
export type BlogListResponse = {
	blogs: BlogHead[]
	status: number
	headers: Headers
}
export type BlogResponse = {
	blog: BlogContent
	status: number
	headers: Headers
}

export function create(
	bucket: import('@cloudflare/workers-types').R2Bucket,
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

export async function remove(
	bucket: import('@cloudflare/workers-types').R2Bucket,
	key: string,
) {
	return await bucket.delete(key)
}

export async function list(
	bucket: import('@cloudflare/workers-types').R2Bucket,
): Promise<BlogListResponse> {
	let r2_blogs
	try {
		r2_blogs = await bucket.list({})
	} catch (err: any) {
		console.error(err)
	}

	if (r2_blogs === undefined) throw new Error('Failed to fetch blogs')

	const blogs: BlogHead[] = []

	let each_blog_head, title, date, comments_enabled
	for (const each_blog of r2_blogs.objects) {
		each_blog_head = await bucket.head(each_blog.key)
		title = each_blog_head?.customMetadata?.title || each_blog.key
		date = each_blog_head?.customMetadata?.date || 'Unknown'
		comments_enabled =
			each_blog_head?.customMetadata?.comments_enabled === 'true'

		blogs.push({ title, url: `/blog/${each_blog.key}`, date, comments_enabled })
	}

	return { blogs, status: 200, headers: new Headers() }
}

export async function get(
	bucket: import('@cloudflare/workers-types').R2Bucket,
	key: string,
	raw: boolean = true,
): Promise<BlogResponse> {
	let blog = await bucket.get(key)

	if (blog === null) throw new Error(`Blog '${key}' not found`)

	let content = await blog.text()

	if (raw && blog.httpMetadata?.contentType === 'text/markdown') {
		content = await transcribe_markdown(content)
	}

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
