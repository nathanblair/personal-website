import { CommentsTableName } from '$lib/constants.ts'
import type { Comment, CommentUpdate, NewComment } from '$lib/types/comment.ts'
import type { D1Database } from '@cloudflare/workers-types'
import { k } from './d1.ts'

export async function create(db: D1Database) {
	let schema = k.schema
		.createTable(CommentsTableName)
		.addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
		.addColumn('slug', 'text', (col) => col.notNull())
		.addColumn('userId', 'integer', (col) => col.notNull())
		.addColumn('userName', 'text', (col) => col.notNull())
		.addColumn('userImage', 'text')
		.addColumn('body', 'text', (col) => col.notNull())
		.addColumn('datePosted', 'datetime', (col) => col.notNull())
		.addColumn('dateEdited', 'datetime')

	const query = schema.compile().sql
	const results = await db.prepare(query).all()

	if (results.error) throw new Error(results.error)

	return results.results
}

export async function drop(db: D1Database) {
	const query = k.schema.dropTable(CommentsTableName).compile().sql
	const results = await db.prepare(query).all()

	if (results.error) throw new Error(results.error)

	return results
}

export async function add(db: D1Database, newComment: NewComment) {
	const query = k
		.insertInto(CommentsTableName)
		.values(newComment)
		.returningAll()
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	const comment = await bound.first<Comment>()

	return comment
}

export async function list(db: D1Database, slug: string) {
	const query = k
		.selectFrom(CommentsTableName)
		.selectAll()
		.where('slug', '=', slug)
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	const all = await bound.all<Comment>()

	if (all.error) throw new Error(all.error)

	const comments = all.results
	return comments
}

export async function get(db: D1Database, id: number) {
	const query = k
		.selectFrom(CommentsTableName)
		.selectAll()
		.where('id', '=', id)
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	const comment = await bound.first<Comment>()

	return comment
}

export async function edit(db: D1Database, id: number, update: CommentUpdate) {
	const query = k
		.updateTable('comments')
		.set(update)
		.where('id', '=', id)
		.returningAll()
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	const comment = await bound.first<CommentUpdate>()

	return comment
}

export async function remove(db: D1Database, id: number) {
	const query = k
		.deleteFrom(CommentsTableName)
		.where('id', '=', id)
		.returningAll()
		.compile()

	const bound = db.prepare(query.sql).bind(...query.parameters)
	const comment = await bound.first<Comment>()

	return comment
}
