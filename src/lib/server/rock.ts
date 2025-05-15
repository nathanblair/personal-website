import type { D1Database } from '@cloudflare/workers-types'

import { CommentsTableName, RocksTableName } from '$lib/constants.ts'
import type { NewRock, Rock } from '$lib/types/rock.ts'
import { has, k } from './d1.ts'

export async function drop(db: D1Database) {
	if (!(await has(db, RocksTableName))) return false

	const query = k.schema.dropTable(RocksTableName).compile().sql
	const results = await db.prepare(query).all()

	if (results.error) throw new Error(results.error)

	return results.results
}

export async function create(db: D1Database) {
	const enable_foreign_keys = `PRAGMA foreign_keys = ON;`
	await db.prepare(enable_foreign_keys).all()

	let schema = k.schema
		.createTable(RocksTableName)
		.addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
		.addColumn('commentId', 'integer', (col) => col.notNull())
		.addColumn('userId', 'integer', (col) => col.notNull())
		.addUniqueConstraint('unique_comment_user', ['commentId', 'userId'])
		.addForeignKeyConstraint(
			'fk_rocks_commentId',
			['commentId'],
			CommentsTableName,
			['id'],
			(fk) => fk.onDelete('cascade'),
		)

	const query = schema.compile().sql
	console.log(query)
	const results = await db.prepare(query).all()

	if (results.error) throw new Error(results.error)

	return results.results
}

export async function get(db: D1Database, commentId: number, userId: number) {
	const query = k
		.selectFrom(RocksTableName)
		.selectAll()
		.where('commentId', '=', commentId)
		.where('userId', '=', userId)
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	const rock = await bound.first<Rock>()

	return rock
}

export async function getById(db: D1Database, id: number) {
	const query = k
		.selectFrom(RocksTableName)
		.selectAll()
		.where('id', '=', id)
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	const rock = await bound.first<Rock>()

	return rock
}

export async function listByComments(db: D1Database, commentIds: number[]) {
	const query = k
		.selectFrom(RocksTableName)
		.selectAll()
		.where('commentId', 'in', commentIds)
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	const all = await bound.all<Rock>()

	if (all.error) throw new Error(all.error)

	const rocks = all.results
	return rocks
}

export async function add(db: D1Database, newRock: NewRock) {
	const query = k
		.insertInto(RocksTableName)
		.values(newRock)
		.returningAll()
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	let rock = await bound.first<Rock>()

	return rock
}

export async function edit(
	db: D1Database,
	id: number,
	commentId: number,
	userId: number,
) {
	const query = k
		.updateTable(RocksTableName)
		.set({ commentId, userId })
		.where('id', '=', id)
		.returningAll()
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	let rock = await bound.first<Rock>()

	return rock
}

export async function remove(db: D1Database, id: number) {
	const query = k
		.deleteFrom(RocksTableName)
		.where('id', '=', id)
		.returningAll()
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	let rock = await bound.first<Rock>()

	return rock
}
