import type { PageServerLoad } from './$types'

import { CommentsTableName, RocksTableName } from '$lib/constants.ts'
import { has } from '$lib/server/d1.ts'

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
