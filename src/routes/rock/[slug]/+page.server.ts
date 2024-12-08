import { comments_table_name, rocks_table_name } from '$lib/constants'
import { drop, init } from '$lib/server/d1'
import type { Session } from '$lib/types'
import { error } from '@sveltejs/kit'
import type { Actions } from './$types'

export const ssr = true
export const prerender = false

export const actions: Actions = {
	clean: async ({ locals }) => {
		const session = await locals.auth() as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		return drop(locals.db, rocks_table_name)
	},
	init: async ({ locals }) => {
		const session = await locals.auth() as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		const enable_foreign_keys = `PRAGMA foreign_keys = ON;`
		await locals.db.prepare(enable_foreign_keys).all()

		const fields: Map<string, { data_type: import('kysely').ColumnDataType; nullable: boolean }> = new Map([
			['comment_id', { data_type: 'integer', nullable: false }],
			['user_id', { data_type: 'integer', nullable: false }],
		])

		const foreign_key_constraints = new Map([
			[
				'fk_rocks_comment_id',
				{
					keys: ['id'],
					foreign_table_name: comments_table_name,
					foreign_keys: ['comment_id'],
				},
			],
		])

		const unique_key_constraints = new Map([
			['unique_comment_user', { a: 'comment_id', b: 'user_id' }],
		])

		return init(
			locals.db,
			rocks_table_name,
			fields,
			foreign_key_constraints,
			unique_key_constraints,
		)
	},
}
