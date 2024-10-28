import { building } from '$app/environment'

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
	const is_authenticated_route = true
	/** @type {import('@auth/sveltekit').Session | null | undefined} */
	let session
	let is_admin = false

	/** @type {{is_authenticated_route: boolean, is_admin: boolean, session: import('@auth/sveltekit').Session | null | undefined}} */
	const load_data = { is_authenticated_route, session, is_admin }

	if (building) return load_data

	if (!event.locals.auth) {
		console.error('Session failed to load')
		return load_data
	}

	session = await event.locals.auth()

	if (session === null) {
		console.error(`No session found`)
		return load_data
	}

	delete session.user?.id

	load_data.session = session
	// @ts-ignore
	load_data.is_admin = session.role === 'admin'
	return load_data
}
