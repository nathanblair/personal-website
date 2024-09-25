import { building } from '$app/environment'
import { init as init_cache_api } from '$lib/server/cache.js'
import { init as init_blog_api } from '$lib/server/github.js'

let blog_api_initialized = false
let cache_api_initialized = false

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (!building) {
    if (!blog_api_initialized && event.platform !== undefined) {
      try {
        blog_api_initialized = await init_blog_api(event.platform.env)
      } catch (/** @type {any} */err) {
        console.error(err)
      }
      if (blog_api_initialized) console.log("Blog API Initialized")
    }

    if (!cache_api_initialized && event.platform !== undefined) {
      try {
        // @ts-ignore
        cache_api_initialized = await init_cache_api(event.platform.caches.default)
      } catch (/** @type {any} */err) {
        console.error(err)
      }
      if (cache_api_initialized) console.log("Cache API Initialized")
    }
  }

  return await resolve(event)
}
