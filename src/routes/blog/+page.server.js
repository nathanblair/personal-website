import { name } from '$lib/constants.js'
import { list } from '$lib/server/blog/api.js'
import { error } from '@sveltejs/kit'

/**
 * @param {Request | import('@cloudflare/workers-types').Request} request
 * @param {App.Platform} platform
 */
async function fetch_blogs(request, platform) {
  /** @type {import("$lib/server/blog/api.js").BlogListResponse} */
  let blog_list_response
  try {
    blog_list_response = await list(platform.env.blogs)
  } catch (/** @type {any} */ err) {
    console.error(err)
    return error(500, err)
  }

  blog_list_response.blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return blog_list_response.blogs
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, platform }) {
  const title = `Blog`
  const description = `The blog of ${name}`

  if (platform === undefined) throw new Error(`Platform was not found`)

  return { title, description, blogs_fetch: fetch_blogs(request, platform) }
}
