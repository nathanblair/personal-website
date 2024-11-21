import { building } from '$app/environment'

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
	if (building) return { session: null }

	/** @type {Session} */
	// @ts-ignore
	const session = await event.locals.auth()

	if (!session) {
		console.error(`No session found`)
		return { session: null }
	}

	return { session }
}
