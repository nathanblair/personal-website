import { add, read, remove } from '$lib/server/rock.ts'
import type { Session } from '$lib/types/auth'
import { error } from '@sveltejs/kit'

export const actions = {
	toggle: async ({ locals, params }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		const commentId = parseInt(params.id, 10)

		const rock = await read(locals.db, commentId, session.user.id)
		return rock
			? remove(locals.db, rock.id)
			: add(locals.db, commentId, session.user.id)
	},
}
