import { handle as auth_handle } from '$lib/server/auth.js'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	try {
		return await auth_handle({ event, resolve })
	} catch (/** @type {any} */ err) {
		console.error(`${event.url.pathname}: ${err.message}`)
	}

	return await resolve(event)
}
