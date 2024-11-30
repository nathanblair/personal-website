import {
	DummyDriver,
	Kysely,
	SqliteAdapter,
	SqliteIntrospector,
	SqliteQueryCompiler,
} from 'kysely'

export const comments_table_name = 'comments'
export const rocks_table_name = 'rocks'

/** @typedef {{
	date_edited?: string?,
	body?: string,
	rocks?: number,
}} EditComment */

/** @typedef {{
	slug: string,
	date_posted: string,
	date_edited?: string?,
  user_id: string,
  user_name: string,
  user_image?: string?,
  body: string,
}} NewComment */

/** @typedef {{
  id: string,
	slug: string,
	date_posted: string,
	date_edited: string?,
	user_id: string,
  user_name: string,
  user_image?: string?,
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
 * @param {string} table_name
 */
export async function has(db, table_name) {
	const query = k
		.selectFrom('sqlite_master')
		.select('name')
		.where('type', '=', 'table')
		.where('name', '=', table_name)
		.compile()
	const result = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
	return result.results.length > 0
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 */
export async function clean(db) {
	const comments_exists = await has(db, comments_table_name)
	if (!comments_exists) {
		console.log(`Table '${comments_table_name}' does not exist.`)
		return Promise.resolve()
	} else {
		const query = k.schema.dropTable(comments_table_name).compile().sql
		await db.prepare(query).all()
	}

	const rocks_exists = await has(db, rocks_table_name)
	if (!rocks_exists) {
		console.log(`Table '${rocks_table_name}' does not exist.`)
		return Promise.resolve()
	} else {
		const query = k.schema.dropTable(rocks_table_name).compile().sql
		await db.prepare(query).all()
	}

	return
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 */
export async function init(db) {
	const enable_foreign_keys = `PRAGMA foreign_keys = ON;`
	await db.prepare(enable_foreign_keys).all()

	const comments = k.schema
		.createTable(comments_table_name)
		.addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
		.addColumn('slug', 'text', (col) => col.notNull())
		.addColumn('user_id', 'integer', (col) => col.notNull())
		.addColumn('user_name', 'text', (col) => col.notNull())
		.addColumn('user_image', 'text')
		.addColumn('body', 'text', (col) => col.notNull())
		.addColumn('date_posted', 'datetime', (col) => col.notNull())
		.addColumn('date_edited', 'datetime')
		.compile().sql

	const rocks = k.schema
		.createTable(rocks_table_name)
		.addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
		.addColumn('comment_id', 'integer', (col) => col.notNull())
		.addColumn('user_id', 'text', (col) => col.notNull())
		.addForeignKeyConstraint(
			'fk_rocks_comment_id',
			['comment_id'],
			comments_table_name,
			['id'],
			(fk) => fk.onDelete('cascade'),
		)
		.addUniqueConstraint('unique_comment_user', ['comment_id', 'user_id']) // Prevent duplicate rocks
		.compile().sql

	await db.prepare(comments).all()
	await db.prepare(rocks).all()
	return
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {number} comment_id
 */
export async function remove(db, comment_id) {
	const query = k
		.deleteFrom(comments_table_name)
		.where('id', '=', comment_id)
		.compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {NewComment} comment
 */
export async function add(db, comment) {
	const query = k.insertInto(comments_table_name).values(comment).compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {number} id
 * @param {EditComment} comment
 */
export function edit(db, id, comment) {
	const query = k
		.updateTable(comments_table_name)
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
 * @param {string} slug
 * @param {number} [id]
 *
 * @returns {Promise<import('@cloudflare/workers-types').D1Result<Comment>>}
 */
export function retrieve(db, slug, id) {
	let query = k
		.selectFrom(comments_table_name)
		.selectAll()
		.where('slug', '=', slug)

	if (id) query = query.where('id', '=', id)
	const q = query.compile()
	console.log(q)

	return db
		.prepare(q.sql)
		.bind(...q.parameters)
		.all()
}
