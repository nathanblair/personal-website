import type { BlogPostSD } from '../structured_data/blog_posting.ts'
import type { ContentType } from './content.ts'

export type Blog = {
	title: string
	date: string
	dateEdited?: string
}

export type BlogMetadata = Blog & {
	commentsEnabled: boolean
}

export type BlogSlug = BlogMetadata & {
	slug: string
}

export type PaginatedBlogSlugs = {
	slugs: BlogSlug[]
	previousCursor?: string
	nextCursor?: string
	truncated: boolean
}

export type BlogPost = BlogMetadata & {
	content: string
}

export type StorageBlog = BlogPost & {
	contentType: ContentType
}

export type BlogSD = StorageBlog & {
	structuredData: BlogPostSD
}
