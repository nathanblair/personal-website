import type { PageServerLoad } from './$types'

import { CommentsTableName, RocksTableName } from '$lib/constants.ts'
import {
	create as createComments,
	drop as dropComments,
} from '$lib/server/comment.ts'
import { has } from '$lib/server/d1.ts'
import { create as createRocks, drop as dropRocks } from '$lib/server/rock.ts'
import type { Session } from '$lib/types/auth.ts'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const load: PageServerLoad = async ({ locals }) => {
	return {
		title: 'Admin',
		description: 'Adjust administrator settings',
		commentsInitialized: has(locals.db, CommentsTableName),
		rocksInitialized: has(locals.db, RocksTableName),
	}
}

export const actions = {
	dropComments: async ({ locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (session.user?.admin !== true) error(403, 'Unauthorized')

		await dropComments(locals.db)
		return
	},
	createComments: async ({ locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (session.user?.admin !== true) error(403, 'Unauthorized')

		await createComments(locals.db)
		return
	},
	dropRocks: async ({ locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (session.user?.admin !== true) error(403, 'Unauthorized')

		await dropRocks(locals.db)
		return
	},
	createRocks: async ({ locals }) => {
		console.log('Rocks table created')
		const session = (await locals.auth()) as Session
		if (!session) error(404, 'Not signed in')

		if (session.user?.admin !== true) error(403, 'Unauthorized')

		await createRocks(locals.db)
		return
	},
}
