import { rocks_table_name } from '$lib/constants.ts'
import { k, remove } from '$lib/server/d1.ts'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params, locals }) => {
	const comment_id = parseInt(params.id, 10)
	const query = k.selectFrom(rocks_table_name)
		.selectAll()
		.where('comment_id', '=', comment_id)
		.compile()

	const results = await locals.db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()

	if (results.error) return error(500, results.error)

	return json(results.results)
}

export const PUT: RequestHandler = async ({ params, locals }) => {
	const session = await locals.auth()
	if (!session) error(404, 'Not signed in')

	const uid = session.user?.id
	if (!uid) error(404, 'User id not found')
	const user_id = parseInt(uid, 10)
	const comment_id = parseInt(params.id, 10)

	const check = k.selectFrom(rocks_table_name)
		.selectAll()
		.where('comment_id', '=', comment_id)
		.where('user_id', '=', user_id)
		.compile()

	const already_rocked = await locals.db
		.prepare(check.sql)
		.bind(...check.parameters)
		.all()

	for (const each_result of already_rocked.results) {
		await remove(locals.db, rocks_table_name, each_result.id as number)
	}
	if (already_rocked.results.length > 0) return error(400, 'Already rocked')

	const record = { comment_id, user_id }

	const query = k.insertInto(rocks_table_name)
		.values(record)
		.compile()

	const results = await locals.db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()

	if (results.error) return error(500, results.error)

	return json(results.results)
}
