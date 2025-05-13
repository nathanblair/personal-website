import { building } from '$app/environment'
import type { Session } from '$lib/types/auth'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	if (building) return { session: null }

	const session = (await event.locals.auth()) as Session
	return { session }
}
