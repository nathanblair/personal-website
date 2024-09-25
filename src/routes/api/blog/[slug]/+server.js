import { retrieve, store } from "$lib/server/cache.js"
import { fetch_blog } from "$lib/server/github.js"
import { error, text } from "@sveltejs/kit"

/** @param {{request: Request, platform: App.Platform}} params */
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

  let /** @type {string} */ blog, /** @type {number} */ status, /** @type {object} */ headers
  try {
    [blog, status, headers] = await fetch_blog(new URL(request.url))
  } catch (/** @type {any} */ err) {
    console.error(err)
    return error(500, err)
  }

  try {
    cached = await store(url, blog, status, headers, platform.context)
  } catch (/** @type {any} */ err) {
    console.error(err)
    return err
  }

  return text(blog)
}
