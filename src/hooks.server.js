import { init } from '$lib/github.js'

let initialized = false

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (!initialized && event.platform !== undefined) {
    try {
      initialized = await init(event.platform.env)
    } catch (/** @type {any} */err) {
      console.error(`Failed to initialize from request to ${event.request.url}: ${err}`)
    }
    if (initialized) console.log("Initialized")
  }

  return await resolve(event)
}
