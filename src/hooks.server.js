import { building } from '$app/environment'
import { handle as auth_handle, init as init_auth } from '$lib/server/auth.js'
import { init as init_blog_api } from '$lib/server/blog/r2.js'
import { init as init_cache_api } from '$lib/server/cache.js'
import { init as init_github_api } from '$lib/server/github.js'

let github_api_initialized = false
let blog_api_initialized = false
let cache_api_initialized = false
let auth_db_initialized = false
let auth_initialized = false

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (!building) {
    if (!github_api_initialized && event.platform !== undefined) {
      try {
        github_api_initialized = await init_github_api(event.platform.env)
      } catch (/** @type {any} */err) {
        console.error(`${event.url.pathname}: ${err.message}`)
      }
      if (github_api_initialized) console.log("GitHub API Initialized")
    }

    if (!blog_api_initialized && event.platform !== undefined) {
      try {
        blog_api_initialized = await init_blog_api(event.platform.env)
      } catch (/** @type {any} */err) {
        console.error(`${event.url.pathname}: ${err.message}`)
      }
      if (blog_api_initialized) console.log("Blog API Initialized")
    }

    if (!auth_initialized && event.platform !== undefined) {
      try {
        auth_initialized = await init_auth(event.platform.env.config)
      } catch (/** @type {any} */err) {
        console.error(`${event.url.pathname}: ${err.message}`)
      }
      if (auth_initialized) console.log("Auth Initialized")
    }

    if (!cache_api_initialized && event.platform !== undefined) {
      try {
        cache_api_initialized = await init_cache_api(event.platform.caches.default)
      } catch (/** @type {any} */err) {
        console.error(`${event.url.pathname}: ${err.message}`)
      }
      if (cache_api_initialized) console.log("Cache API Initialized")
    }
  }

  try {
    return await auth_handle({ event, resolve })
  } catch (/** @type {any} */err) {
    console.error(`${event.url.pathname}: ${err.message}`)
  }

  return await resolve(event)
}
