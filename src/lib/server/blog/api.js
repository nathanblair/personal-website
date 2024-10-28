import { transcribe_markdown } from '../github.js'

/**
 * @param {import('@cloudflare/workers-types').R2Bucket} bucket
 * @param {string} key
 * @param {string} title
 * @param {string} date
 * @param {boolean} comments
 * @param {string} content
 * @param {string} content_type
 */
export async function create(
	bucket,
	key,
	title,
	date,
	comments,
	content,
	content_type,
) {
	const comments_enabled = comments.toString()
	return await bucket.put(key, content, {
		httpMetadata: { contentType: content_type },
		customMetadata: { title, date, comments_enabled },
	})
}

/**
 * @param {import('@cloudflare/workers-types').R2Bucket} bucket
 * @param {string} key
 */
export async function remove(bucket, key) {
	return await bucket.delete(key)
}

/** @typedef {{
 * blogs: import('$lib/blog.js').Blog[],
 * status: number,
 * headers: Headers
 * }} BlogListResponse */

/** @typedef {{
 * title: string,
 * date: string,
 * content: string,
 * status: number,
 * headers: Headers,
 * comments_enabled: boolean
 * }} BlogObject */

/**
 * @param {import('@cloudflare/workers-types').R2Bucket} bucket
 *
 * @returns {Promise<BlogListResponse>}
 */
export async function list(bucket) {
	let r2_blogs
	try {
		r2_blogs = await bucket.list({})
	} catch (/** @type {any} */ err) {
		console.error(err)
	}

	if (r2_blogs === undefined) throw new Error('Failed to fetch blogs')

	/** @type {import('$lib/blog.js').Blog[]} */
	const blogs = []

	let each_blog_head, title, date
	for (const each_blog of r2_blogs.objects) {
		each_blog_head = await bucket.head(each_blog.key)
		title = each_blog_head?.customMetadata?.title || each_blog.key
		date = each_blog_head?.customMetadata?.date || 'Unknown'

		blogs.push({ title, url: `/blog/${each_blog.key}`, date })
	}

	return { blogs, status: 200, headers: new Headers() }
}

/**
 * @param {import('@cloudflare/workers-types').R2Bucket} bucket
 * @param {string} key
 * @param {boolean} [raw=true]
 *
 * @returns {Promise<BlogObject>}
 */
export async function get(bucket, key, raw = true) {
	let blog = await bucket.get(key, {})

	if (blog === null) throw new Error(`Blog '${key}' not found`)

	let content = await blog.text()

	if (raw && blog.httpMetadata?.contentType === 'text/markdown') {
		content = await transcribe_markdown(content)
	}

	let blog_head
	try {
		blog_head = await bucket.head(key)
	} catch (/** @type {any} */ err) {
		console.error(err)
		throw err
	}

	const title = blog_head?.customMetadata?.title || key
	const comments_enabled =
		blog_head?.customMetadata?.comments_enabled === 'true'
	const date = blog_head?.customMetadata?.date
	if (!date) throw new Error(`Blog '${key}' does not have a date`)

	const headers = new Headers({
		'Content-Type': blog.httpMetadata?.contentType || 'text/plain',
		'Cache-Control': blog.httpMetadata?.cacheControl || 'no-cache',
	})

	return { title, date, content, status: 200, comments_enabled, headers }
}
