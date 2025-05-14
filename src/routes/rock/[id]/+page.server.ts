import { error } from '@sveltejs/kit'

import { add, read, remove } from '$lib/server/rock.ts'
import type { Session } from '$lib/types/auth'

export const actions = {
	toggle: async ({ locals, params }) => {
		const session = (await locals.auth()) as Session
		if (!session || !session.user) error(404, 'Not signed in')

		const commentId = parseInt(params.id, 10)

		const rock = await read(locals.db, commentId, session.user.id)
		rock
			? await remove(locals.db, rock.id)
			: await add(locals.db, { commentId, userId: session.user.id })

		return
	},
}
