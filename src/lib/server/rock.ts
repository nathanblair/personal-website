import { CommentsTableName, RocksTableName } from '$lib/constants.ts'
import type { NewRock, Rock } from '$lib/types/rock.ts'
import type { D1Database, D1Result } from '@cloudflare/workers-types'
import { error } from '@sveltejs/kit'
import { has, k } from './d1.ts'

export async function drop(db: D1Database) {
	if (!(await has(db, RocksTableName))) return false

	const query = k.schema.dropTable(RocksTableName).compile().sql
	const results = await db.prepare(query).all()

	if (results.error) return results.error

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

	if (results.error) return error(500, results.error)

	return results.results
}

export async function read(
	db: D1Database,
	commentId: number,
	userId: number,
): Promise<Rock | null> {
	const query = k
		.selectFrom(RocksTableName)
		.selectAll()
		.where('commentId', '=', commentId)
		.where('userId', '=', userId)
		.compile()

	return await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.first()
}

export async function readById(
	db: D1Database,
	id: number,
): Promise<Rock | null> {
	const query = k
		.selectFrom(RocksTableName)
		.selectAll()
		.where('id', '=', id)
		.compile()

	return await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.first()
}

export async function list(db: D1Database, commentId: number): Promise<Rock[]> {
	const query = k
		.selectFrom(RocksTableName)
		.selectAll()
		.where('commentId', '=', commentId)
		.compile()

	const all: D1Result<Rock> = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()

	if (all.error) return error(500, all.error)

	const rocks: Rock[] = all.results
	return rocks
}

export async function add(db: D1Database, newRock: NewRock) {
	const query = k.insertInto(RocksTableName).values(newRock).compile()

	console.log(query.sql, query.parameters)

	const statement = db.prepare(query.sql).bind(...query.parameters)

	let rock: Rock | null = null
	try {
		rock = await statement.first()
	} catch (err) {
		console.error(err)
	}

	return rock
}

export async function edit(
	db: D1Database,
	id: number,
	commentId: number,
	userId: number,
): Promise<Rock | null> {
	const query = k
		.updateTable(RocksTableName)
		.set({ commentId, userId })
		.where('id', '=', id)
		.compile()

	const rock: Rock | null = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.first()

	return rock
}

export async function remove(db: D1Database, id: number): Promise<Rock | null> {
	const query = k.deleteFrom(RocksTableName).where('id', '=', id).compile()

	console.log(query.sql, query.parameters)

	const rock: Rock | null = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.first()

	return rock
}
