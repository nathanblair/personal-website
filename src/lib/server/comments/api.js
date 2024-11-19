import knex from 'knex'

/** @typedef {{author: string, body: string }} NewComment */

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

	return await db.prepare(query).all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 */
export async function init(db, post_slug) {
	const query = k.schema
		.createTable(post_slug, (table) => {
			table.increments('id').primary()
			table.string('author').notNullable()
			table.text('body').notNullable()
			table.datetime('date').defaultTo(k.fn.now())
		})
		.toQuery()
	console.log(query)

	return await db.prepare(query).all()
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

	return {}
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 * @param {string} id
 * @param {Comment} comment
 */
export async function edit(db, post_slug, id, comment) {
	const query = k.where({ id }).update(comment).into(post_slug).toQuery()
	console.log(query)

	return {}
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 */
export async function retrieve(db, post_slug) {
	const query = k.select().from(post_slug).toQuery()
	console.log(query)

	return await db.prepare(query).all()
}
