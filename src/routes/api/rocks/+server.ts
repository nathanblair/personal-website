import { comments_table_name, rocks_table_name } from '$lib/constants.ts'
import { drop, has, k } from '$lib/server/d1.ts'
import type { Session } from '$lib/types.ts'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) => {
	const present = await has(locals.db, rocks_table_name)
	return json(present)
}

export const DELETE: RequestHandler = async ({ locals }) => {
	const session = (await locals.auth()) as Session
	if (!session) error(404, 'Not signed in')

	if (session.user?.admin !== true) error(403, 'Unauthorized')

	const r = await drop(locals.db, rocks_table_name)
	return json(r)
}

export const PUT: RequestHandler = async ({ locals }) => {
	const session = (await locals.auth()) as Session
	if (!session) error(404, 'Not signed in')

	if (session.user?.admin !== true) error(403, 'Unauthorized')

	const enable_foreign_keys = `PRAGMA foreign_keys = ON;`
	await locals.db.prepare(enable_foreign_keys).all()

	let schema = k.schema
		.createTable(rocks_table_name)
		.addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
		.addColumn('comment_id', 'integer', (col) => col.notNull())
		.addColumn('user_id', 'integer', (col) => col.notNull())
		.addUniqueConstraint('unique_comment_user', ['comment_id', 'user_id'])
		.addForeignKeyConstraint(
			'fk_rocks_comment_id',
			['comment_id'],
			comments_table_name,
			['id'],
			(fk) => fk.onDelete('cascade'),
		)

	const query = schema.compile().sql
	console.log(query)
	const results = await locals.db.prepare(query).all()

	if (results.error) return error(500, results.error)

	return json(true)
}
