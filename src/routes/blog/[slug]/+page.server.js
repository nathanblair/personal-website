import { get, remove } from '$lib/server/blog/api.js'
import {
	comments_table_name,
	has,
	retrieve,
	rocks_table_name,
} from '$lib/server/comments/api.js'
import { BlogPosting } from '$lib/structured_data/blog_posting.js'
import { my_person } from '$lib/structured_data/person.js'
import { error, redirect } from '@sveltejs/kit'

/** @typedef {{ date: Date, content: string} & PageOutput} BlogPageOutput */

/**
 * @param {import('./$types').RouteParams} params
 * @param {App.Platform} platform
 */
async function fetch_blog(params, platform) {
	// @ts-ignore
	let { title, date, content, comments_enabled, headers } = {}
	try {
		;({ title, date, content, comments_enabled, headers } = await get(
			platform.env.blogs,
			params.slug,
		))
	} catch (/** @type {any} */ err) {
		return error(404, err.message)
	}

	const blog_date = new Date(date)
	const structured_data = new BlogPosting(blog_date, title, my_person)
		.structured_data

	return {
		title,
		date,
		content,
		comments_enabled,
		content_type: headers?.get('Content-Type'),
		structured_data,
	}
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, platform }) {
	const initialized = platform?.env.db
		? (await has(platform?.env.db, comments_table_name)) &&
			(await has(platform?.env.db, rocks_table_name))
		: Promise.resolve(false)

	if (platform === undefined) throw new Error(`Platform was not found`)

	return {
		description: '',
		blog_fetch: fetch_blog(params, platform),
		initialized,
		comments:
			platform?.env.db && initialized
				? retrieve(platform?.env.db)
				: Promise.resolve({ results: [] }),
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	remove: async ({ params, platform }) => {
		if (platform === undefined) throw new Error(`Platform was not found`)

		await remove(platform?.env.blogs, params.slug)
		redirect(303, '/blog')
	},
	edit: async ({ params }) => {
		redirect(303, `/blog/edit/${params.slug}`)
	},
}
