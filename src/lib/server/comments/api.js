import knex from 'knex'

/** @typedef {{
	date: string
  user_id: string,
  user_name: string,
  user_email?: string?,
  user_image?: string?,
  body: string
}} NewComment */

/** @typedef {{
  id: string,
	date: string
	user_id: string,
  user_name: string,
  user_email?: string?,
  user_image?: string?,
  rocks: number,
  body: string
}} Comment */

const k = knex({
	client: 'sqlite3',
	dialect: 'sqlite3',
	useNullAsDefault: true,
})

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 */
export async function has(db, post_slug) {
	const query = k
		.raw("SELECT * FROM sqlite_master WHERE type='table' AND name=:post_slug", {
			post_slug,
		})
		.toQuery()
	const result = await db.prepare(query).all()
	return result.results.length > 0
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 */
export async function clean(db, post_slug) {
	const query = k.schema.dropTableIfExists(post_slug).toQuery()
	console.log(query)
	return db.prepare(query).all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 */
export async function init(db, post_slug) {
	const query = k.schema
		.createTable(post_slug, (table) => {
			table.increments('id').primary()
			table.string('user_id').notNullable()
			table.string('user_name').notNullable()
			table.string('user_email')
			table.string('user_image')
			table.integer('rocks').defaultTo(0).notNullable()
			table.text('body').notNullable()
			table.datetime('date').notNullable()
		})
		.toQuery()
	console.log(query)

	return db.prepare(query).all()
}

export async function remove() {
	return {}
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 * @param {NewComment} comment
 */
export async function add(db, post_slug, comment) {
	const query = k.insert(comment).into(post_slug).toQuery()
	console.log(query)
	return db.prepare(query).all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 * @param {string} id
 * @param {NewComment} comment
 */
export function edit(db, post_slug, id, comment) {
	const query = k.where({ id }).update(comment).into(post_slug).toQuery()
	console.log(query)

	return {}
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 *
 * @returns {Promise<import('@cloudflare/workers-types').D1Result<Comment>>}
 */
export function retrieve(db, post_slug) {
	const query = k.select().from(post_slug).toQuery()
	console.log(query)
	return db.prepare(query).all()
}
