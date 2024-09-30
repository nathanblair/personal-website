import { list } from "$lib/server/blog/r2.js"
import { retrieve as retrieve_from_cache, store as store_to_cache } from "$lib/server/cache.js"
// import { fetch_blogs } from "$lib/server/github.js"
import { error, json } from "@sveltejs/kit"

/**
 @param {{request: Request, platform: App.Platform}} params
 */
export async function GET({ request, platform }) {
  const url = new URL(request.url)

  /** @type {Response | import('@cloudflare/workers-types').Response | undefined} */
  let cached
  try {
    cached = await retrieve_from_cache(url)
  } catch (/** @type {any} */ err) {
    console.error(err)
    return err
  }

  if (cached !== undefined) return cached

  /** @type {import("$lib/server/blog/r2.js").BlogListResponse} */
  let blog_list_response
  try {
    blog_list_response = await list()
  } catch (/** @type {any} */ err) {
    console.error(err)
    return error(500, err)
  }

  blog_list_response.blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  try {
    cached = await store_to_cache(
      url,
      JSON.stringify(blog_list_response.blogs),
      blog_list_response.status,
      blog_list_response.headers,
      platform.context
    )
  } catch (/** @type {any} */ err) {
    console.error(err)
    return err
  }

  return json(blog_list_response.blogs)
}
