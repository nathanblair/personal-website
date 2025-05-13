import { create, drop } from '$lib/server/comment.js'
import type { Session } from '$lib/types/auth'
import { error } from '@sveltejs/kit'

export const actions = {
	drop: async ({ locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (session.user?.admin !== true) error(403, 'Unauthorized')

		return drop(locals.db)
	},
	create: async ({ locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (session.user?.admin !== true) error(403, 'Unauthorized')

		return create(locals.db)
	},
}
