import { retrieve, store } from "$lib/server/cache.js"
import { fetch_blogs } from "$lib/server/github.js"
import { error, json } from "@sveltejs/kit"

/**
 @param {{request: Request, platform: App.Platform}} params
 */
export async function GET({ request, platform }) {
  const url = new URL(request.url)

  /** @type {Response | import('@cloudflare/workers-types').Response | undefined} */
  let cached
  try {
    cached = await retrieve(url)
  } catch (/** @type {any} */ err) {
    console.error(err)
    return err
  }

  if (cached !== undefined) return cached

  let /** @type {import("$lib/blog.js").Blog[]} */ blogs, /** @type {number} */ status, /** @type {object} */ headers
  try {
    [blogs, status, headers] = await fetch_blogs(url)
  } catch (/** @type {any} */ err) {
    console.error(err)
    return error(500, err)
  }

  blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  try {
    cached = await store(url, JSON.stringify(blogs), status, headers, platform.context)
  } catch (/** @type {any} */ err) {
    console.error(err)
    return err
  }

  return json(blogs)
}
