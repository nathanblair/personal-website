import { get } from '$lib/server/r2'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals, params }) => {
	const blog_response = await get(locals.blogs, params.slug)
	return json(blog_response)
}
