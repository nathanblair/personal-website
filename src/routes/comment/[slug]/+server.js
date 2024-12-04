import { comments_table_name, rocks_table_name } from '$lib/constants.js'
import { has, k } from '$lib/server/d1.js'
import { error, json } from '@sveltejs/kit'
import { sql } from 'kysely'

/** @type {import('./$types').RequestHandler} */
export async function GET({ platform, locals, params }) {
	if (!platform?.env.db) error(500, 'Database not initialized')

	const session = await locals.auth()
	if (!session) error(404, 'Not signed in')

	if (!(await has(platform?.env.db, comments_table_name))) {
		error(404, 'Comments not initialized')
	} else if (!(await has(platform?.env.db, rocks_table_name))) {
		error(404, 'Rocks not initialized')
	}

	let query = k
		.selectFrom('comments as c')
		.leftJoin('rocks as r', 'c.id', 'r.comment_id')
		.select([
			'c.id',
			'c.slug',
			'c.body',
			'c.user_id',
			'c.user_name',
			'c.user_image',
			'c.date_posted',
			'c.date_edited',
			sql`COUNT(r.id)`.as('rock_count'),
			sql`EXISTS (
          SELECT 1
          FROM rocks r2
          WHERE r2.comment_id = c.id
          AND r2.user_id = ${session.user?.id}
      )`.as('rocked_by_user'),
		])
		.where('c.slug', '=', params.slug)

	query = query.groupBy([
		'c.id',
		'c.slug',
		'c.body',
		'c.user_id',
		'c.user_image',
		'c.user_name',
		'c.date_posted',
		'c.date_edited',
	])

	const compiled = query.compile()

	const results = await platform?.env.db
		.prepare(compiled.sql)
		.bind(...compiled.parameters)
		.all()

	return json(results.results)
}
