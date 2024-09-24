import { fetch_blogs } from "$lib/github.js"
import { error, json } from "@sveltejs/kit"

/**
 @param {{request: Request, platform: App.Platform}} params
 */
export async function GET({ request, platform }) {
  /** @type {Blog[]} */
  let blogs
  try {
    // @ts-ignore
    blogs = await fetch_blogs(new URL(request.url).pathname, platform.caches.default, platform.context)
  } catch (/** @type {any} */ err) {
    error(500, err)
  }

  blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return json(blogs)
}
