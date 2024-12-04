import { comments_table_name, rocks_table_name } from '$lib/constants.js'
import { drop, init, retrieve } from '$lib/server/d1.js'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const actions = {
	rock: async ({ platform, url, params }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		const id = url.searchParams.get('id')
		if (!id) error(500, 'Comment ID not found')

		const user_id = url.searchParams.get('user_id')
		if (!user_id) error(500, 'User ID not found')

		const rocked = url.searchParams.get('rocked')
		if (!rocked) error(500, 'Could not determine rock status')

		const current_comment = await retrieve(
			platform?.env.db,
			rocks_table_name,
			params.slug,
			parseInt(id),
		)

		const is_rocked = rocked === 'true'
		// const current_rocks = current_comment.results[0].rocks
		const current_rocks = 0
		const rocks = is_rocked ? current_rocks + 1 : current_rocks - 1

		console.log('Rock', id, user_id, rocked, rocks)

		// return edit(platform?.env.comments, 'test', parseInt(id, 10), { rocks })
	},
	clean: async ({ platform, locals }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		/** @type {Session | null} */
		const session = await locals.auth()
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		return drop(platform?.env.db, rocks_table_name)
	},
	init: async ({ platform, locals }) => {
		if (!platform?.env.db) error(500, 'Database not initialized')

		/** @type {Session | null} */
		const session = await locals.auth()
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		const enable_foreign_keys = `PRAGMA foreign_keys = ON;`
		await platform?.env.db.prepare(enable_foreign_keys).all()

		/** @type {Map<string, { data_type: import('kysely').ColumnDataType, nullable: boolean }>} */
		const fields = new Map([
			['comment_id', { data_type: 'integer', nullable: false }],
			['user_id', { data_type: 'integer', nullable: false }],
		])

		const foreign_key_constraints = new Map()
		foreign_key_constraints.set('fk_rocks_comment_id', {
			keys: ['id'],
			foreign_table_name: comments_table_name,
			foreign_keys: ['comment_id'],
		})

		const unique_key_constraints = new Map()
		unique_key_constraints.set('unique_comment_user', {
			a: 'comment_id',
			b: 'user_id',
		})

		return init(
			platform?.env.db,
			rocks_table_name,
			fields,
			foreign_key_constraints,
			unique_key_constraints,
		)
	},
}
