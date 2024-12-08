import { comments_table_name } from '$lib/constants.ts'
import { k } from '$lib/server/d1'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals, params }) => {
	const session = await locals.auth()
	if (!session) error(404, 'Not signed in')

	const query = k.selectFrom(comments_table_name)
		.selectAll()
		.where('slug', '=', params.slug)
		.compile()

	const results = await locals.db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()

	if (results.error) return error(500, results.error)

	return json(results.results)
}

export const PUT: RequestHandler = async ({ request, locals, params, url }) => {
	const session = await locals.auth()
	if (!session) error(404, 'Not signed in')

	const uid = session.user?.id
	if (!uid) error(404, 'User id not found')
	const user_name = session.user?.name
	if (!user_name) error(404, 'User name not found')
	const user_image = session.user?.image
	const user_id = parseInt(uid, 10)

	const locale = url.searchParams.get('locale')
	if (!locale) throw new Error('Locale not found')
	const timeZone = url.searchParams.get('timeZone')
	if (!timeZone) throw new Error('Timezone not found')

	const date_posted = new Date().toLocaleString(locale, { timeZone })

	const j = await request.json()
	const comment_record = {
		slug: params.slug,
		user_id,
		user_name,
		user_image,
		date_posted,
		body: j.content,
	}

	const query = k.insertInto(comments_table_name)
		.values(comment_record)
		.compile()

	const results = await locals.db.prepare(query.sql)
		.bind(...query.parameters)
		.all()

	if (results.error) return error(500, results.error)

	return json(results)
}
