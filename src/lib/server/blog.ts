import type {
	BlogMetadata,
	BlogSlug,
	PaginatedBlogSlugs,
	StorageBlog,
} from '$lib/types/blog.ts'
import { ContentType } from '$lib/types/content.ts'
import type { R2ObjectBody } from '@cloudflare/workers-types'
import type {
	R2Bucket,
	R2Conditional,
	R2ListOptions,
	R2PutOptions,
} from '@cloudflare/workers-types/2023-07-01/index.ts'
import { Prefix } from './prefix.ts'

export function formatKey(date?: string) {
	const d = new Date(date ?? new Date().toISOString())

	const dateParts = [
		d.getUTCFullYear(),
		(d.getUTCMonth() + 1).toString().padStart(2, '0'),
		d.getUTCDate().toString().padStart(2, '0'),
	]

	const slug = d.getTime().toString(36)

	const key = `${dateParts.join('/')}/${slug}`
	return key
}

export function create(bucket: R2Bucket, key: string, blog: StorageBlog) {
	const customMetadata: BlogMetadata = {
		title: blog.title,
		date: blog.date,
		// @ts-ignore
		commentsEnabled: blog.commentsEnabled.toString(),
	}
	if (blog.dateEdited) customMetadata.dateEdited = blog.dateEdited

	const options: R2PutOptions & {
		onlyIf: R2Conditional | Headers
	} = {
		httpMetadata: { contentType: blog.contentType },
		// @ts-ignore
		customMetadata,
	}

	console.log('Creating blog', key)
	return bucket.put(key, blog.content, options)
}

export async function entries(
	bucket: R2Bucket,
	prefix?: string,
	delimiter: string = '/',
) {
	const r2ListOptions: R2ListOptions = { delimiter, prefix }

	const r2Objects = await bucket.list(r2ListOptions)

	const prefixes = r2Objects.delimitedPrefixes.map((eachPrefix) =>
		Prefix.fromPath(eachPrefix),
	)

	return prefixes
}

export async function list(
	bucket: R2Bucket,
	limit?: number,
	cursor?: string,
	prefix?: string,
) {
	const r2ListOptions: R2ListOptions = {
		limit,
		cursor,
		prefix,
		include: ['customMetadata'],
	}
	const r2Blogs = await bucket.list(r2ListOptions)

	if (!r2Blogs) throw new Error('Failed to fetch blogs')

	const blogSlugs: BlogSlug[] = r2Blogs.objects.map((each) => ({
		title: each.customMetadata?.title || each.key,
		slug: each.key,
		date: each.customMetadata?.date || 'Unknown',
		commentsEnabled: each.customMetadata?.commentsEnabled === 'true',
	}))

	const paginatedBlogSlugs: PaginatedBlogSlugs = {
		slugs: blogSlugs,
		nextCursor: r2Blogs.truncated ? r2Blogs.cursor : undefined,
		previousCursor: cursor,
		truncated: r2Blogs.truncated,
	}

	return paginatedBlogSlugs
}

export async function get(bucket: R2Bucket, key: string) {
	let blog: R2ObjectBody | null = null
	try {
		blog = await bucket.get(key)
	} catch (err: any) {
		console.error(err)
		throw err
	}

	if (blog === null) throw new Error(`Blog '${key}' not found`)

	const date = blog.customMetadata?.date
	if (!date) throw new Error(`Blog '${key}' does not have a date`)
	const dateEdited = blog.customMetadata?.dateEdited

	const title = blog.customMetadata?.title || key
	const commentsEnabled = blog.customMetadata?.commentsEnabled === 'true'

	const rawContentType = blog.httpMetadata?.contentType || ContentType.PlainText
	const contentType = rawContentType as ContentType

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
