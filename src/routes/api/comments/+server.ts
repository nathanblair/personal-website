import { comments_table_name } from '$lib/constants.ts'
import { drop, has, k } from '$lib/server/d1.ts'
import type { Session } from '$lib/types.ts'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) => {
	const present = await has(locals.db, comments_table_name)
	return json(present)
}

export const DELETE: RequestHandler = async ({ locals }) => {
	const session = (await locals.auth()) as Session
	if (!session) error(404, 'Not signed in')

	if (session.user?.admin !== true) error(403, 'Unauthorized')

	const r = await drop(locals.db, comments_table_name)
	return json(r)
}

export const PUT: RequestHandler = async ({ locals }) => {
	const session = (await locals.auth()) as Session
	if (!session) error(404, 'Not signed in')

	if (session.user?.admin !== true) error(403, 'Unauthorized')

	let schema = k.schema
		.createTable(comments_table_name)
		.addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
		.addColumn('slug', 'text', (col) => col.notNull())
		.addColumn('user_id', 'integer', (col) => col.notNull())
		.addColumn('user_name', 'text', (col) => col.notNull())
		.addColumn('user_image', 'text')
		.addColumn('body', 'text', (col) => col.notNull())
		.addColumn('date_posted', 'datetime', (col) => col.notNull())
		.addColumn('date_edited', 'datetime')

	const query = schema.compile().sql
	console.log(query)
	const results = await locals.db.prepare(query).all()

	if (results.error) return error(500, results.error)

	return json(true)
}
