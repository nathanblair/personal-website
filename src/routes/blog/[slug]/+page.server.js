import { get, remove } from '$lib/server/blog/api.js'
import { retrieve } from '$lib/server/blog/comments.js'
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
    ({ title, date, content, comments_enabled, headers } = await get(platform.env.blogs, params.slug))
  } catch (/** @type {any} */ err) {
    return error(404, err.message)
  }

  const blog_date = new Date(date)
  const structured_data = new BlogPosting(blog_date, title, my_person).structured_data

  return {
    title,
    date,
    content,
    comments_enabled,
    content_type: headers?.get("Content-Type"),
    structured_data
  }
}

/**
 * @param {import('./$types').RouteParams} params
 * @param {App.Platform} platform
 */
async function fetch_comments(params, platform) {
  let { } = {}
  try {
    ({} = await retrieve(platform.env.comments, params.slug))
  } catch (/** @type {any} */ err) {
    return error(404, err.message)
  }

  return {}
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, platform }) {
  const description = ""

  if (platform === undefined) throw new Error(`Platform was not found`)

  return {
    description,
    blog_fetch: fetch_blog(params, platform),
    comments_fetch: fetch_comments(params, platform)
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  remove: async ({ params, platform }) => {
    if (platform === undefined) throw new Error(`Platform was not found`)

    await remove(platform?.env.blogs, params.slug)
    redirect(303, "/blog")
  },
  edit: async ({ params }) => {
    redirect(303, `/blog/edit/${params.slug}`)
  }
}
