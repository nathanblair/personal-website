import type { BlogPostSD } from '../structured_data/blog_posting.ts'

export interface Blog {
	title: string
	date: string
}

export interface BlogMetadata extends Blog {
	commentsEnabled: boolean
}
export interface BlogSlug extends BlogMetadata {
	slug: string
}
export interface BlogPost extends BlogMetadata {
	content: string
}

export interface FetchedBlog extends BlogPost {
	contentType: string
}

export interface StorageBlog extends FetchedBlog {
	structuredData: BlogPostSD
}
