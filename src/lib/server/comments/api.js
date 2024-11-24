import {
	DummyDriver,
	Kysely,
	SqliteAdapter,
	SqliteIntrospector,
	SqliteQueryCompiler,
} from 'kysely'

/** @typedef {{ date_edited?: string?, body: string }} EditComment */

/** @typedef {{
	date_posted: string,
	date_edited?: string?,
  user_id: string,
  user_name: string,
  user_email?: string?,
  user_image?: string?,
  body: string
}} NewComment */

/** @typedef {{
  id: string,
	date_posted: string,
	date_edited: string?,
	user_id: string,
  user_name: string,
  user_email?: string?,
  user_image?: string?,
  rocks: number,
  body: string,
}} Comment */

const k = new Kysely({
	dialect: {
		createAdapter: () => new SqliteAdapter(),
		createDriver: () => new DummyDriver(),
		createIntrospector: (db) => new SqliteIntrospector(db),
		createQueryCompiler: () => new SqliteQueryCompiler(),
	},
})

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 */
export async function has(db, post_slug) {
	const query = k
		.selectFrom('sqlite_master')
		.select('name')
		.where('type', '=', 'table')
		.where('name', '=', post_slug)
		.compile()
	const result = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
	return result.results.length > 0
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 */
export async function clean(db, post_slug) {
	const tableExists = await has(db, post_slug)
	if (!tableExists) {
		console.log(`Table ${post_slug} does not exist.`)
		return Promise.resolve()
	}
	const query = k.schema.dropTable(post_slug).compile().sql
	return db.prepare(query).all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 */
export async function init(db, post_slug) {
	const table = k.schema.createTable(post_slug)
	const query = table
		.addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
		.addColumn('user_id', 'integer', (col) => col.notNull())
		.addColumn('user_name', 'text', (col) => col.notNull())
		.addColumn('user_email', 'text')
		.addColumn('user_image', 'text')
		.addColumn('body', 'text', (col) => col.notNull())
		.addColumn('rocks', 'integer', (col) => col.notNull().defaultTo(0))
		.addColumn('date_posted', 'datetime', (col) => col.notNull())
		.addColumn('date_edited', 'datetime')
		.compile().sql

	return db.prepare(query).all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 * @param {number} comment_id
 */
export async function remove(db, post_slug, comment_id) {
	const query = k.deleteFrom(post_slug).where('id', '=', comment_id).compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 * @param {NewComment} comment
 */
export async function add(db, post_slug, comment) {
	const query = k.insertInto(post_slug).values(comment).compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 * @param {number} id
 * @param {EditComment} comment
 */
export function edit(db, post_slug, id, comment) {
	const query = k
		.updateTable(post_slug)
		.set(comment)
		.where('id', '=', id)
		.compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} post_slug
 *
 * @returns {Promise<import('@cloudflare/workers-types').D1Result<Comment>>}
 */
export function retrieve(db, post_slug) {
	const query = k.selectFrom(post_slug).selectAll().compile().sql
	return db.prepare(query).all()
}
