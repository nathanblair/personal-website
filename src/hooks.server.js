import { browser } from '$app/environment'
import { init, initialized } from '$lib/github.js'
import { error } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (!browser && !initialized) {
    if (event.platform === undefined) error(500, "Platform not found")
    if (event.platform.env === undefined) error(500, "Platform env not found")
    if (!initialized) {
      console.log("Initializing GitHub app...")
      await init(event.platform.env)
    }
  }

  return await resolve(event)
}
