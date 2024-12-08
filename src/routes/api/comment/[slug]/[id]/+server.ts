import { comments_table_name } from '$lib/constants'
import { k, remove } from '$lib/server/d1'
import type { Session } from '$lib/types'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const session = await locals.auth() as Session
	if (!session) error(404, 'Not signed in')

	const id = parseInt(params.id, 10)

	const comment_query = k.selectFrom(comments_table_name).
		selectAll()
		.where('id', '=', id)
		.compile()

	const comment = await locals.db.prepare(comment_query.sql)
		.bind(...comment_query.parameters)
		.first()
	if (!comment) error(404, 'Comment not found')

	if (session.user?.id !== comment.user_id) error(403, 'Unauthorized')

	const results = await remove(locals.db, comments_table_name, id)

	if (results.error) return error(500, results.error)

	return json(results)
}

export const PATCH: RequestHandler = async ({ request, params, locals, url }) => {
	const session = await locals.auth() as Session
	if (!session) error(404, 'Not signed in')

	const id = parseInt(params.id, 10)

	const comment_query = k.selectFrom(comments_table_name)
		.selectAll()
		.where('id', '=', id)
		.compile()

	const comment = await locals.db.prepare(comment_query.sql)
		.bind(...comment_query.parameters)
		.first()
	if (!comment) error(404, 'Comment not found')

	if (session.user?.id !== comment.user_id) error(403, 'Unauthorized')

	const locale = url.searchParams.get('locale')
	if (!locale) error(404, 'Locale not found')
	const timeZone = url.searchParams.get('timeZone')
	if (!timeZone) error(404, 'Timezone not found')

	const date_edited = new Date().toLocaleString(locale, { timeZone })

	const j = await request.json()
	const record = { body: j.content, date_edited }

	const query = k.updateTable('comments')
		.set(record)
		.where('id', '=', id)
		.compile()

	const results = await locals.db.prepare(query.sql)
		.bind(...query.parameters)
		.all()

	if (results.error) return error(500, results.error)

	return json(results.results)
}
