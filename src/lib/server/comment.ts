import { CommentsTableName } from '$lib/constants.ts'
import type { Comment, CommentUpdate, NewComment } from '$lib/types/comments.ts'
import type { D1Database, D1Result } from '@cloudflare/workers-types'
import { error } from '@sveltejs/kit'
import { has, k } from './d1.ts'

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
	console.log(query)
	const results = await db.prepare(query).all()

	if (results.error) return error(500, results.error)

	return results.results
}

export async function drop(db: D1Database) {
	if (!(await has(db, CommentsTableName))) return false

	const query = k.schema.dropTable(CommentsTableName).compile().sql
	const results = await db.prepare(query).all()

	if (results.error) return results.error

	return results
}

export async function add(
	db: D1Database,
	newComment: NewComment,
): Promise<Comment | null> {
	const query = k.insertInto(CommentsTableName).values(newComment).compile()

	const comment: Comment | null = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.first()

	return comment
}

export async function list(db: D1Database, slug: string): Promise<Comment[]> {
	const query = k
		.selectFrom(CommentsTableName)
		.selectAll()
		.where('slug', '=', slug)
		.compile()

	const all: D1Result<Comment> = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()

	if (all.error) return error(500, all.error)

	const comments: Comment[] = all.results
	return comments
}

export async function read(
	db: D1Database,
	id: number,
): Promise<Comment | null> {
	const query = k
		.selectFrom(CommentsTableName)
		.selectAll()
		.where('id', '=', id)
		.compile()

	return await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.first()
}

export async function edit(
	db: D1Database,
	id: number,
	update: CommentUpdate,
): Promise<CommentUpdate | null> {
	const query = k
		.updateTable('comments')
		.set(update)
		.where('id', '=', id)
		.compile()

	const comment: CommentUpdate | null = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.first()

	return comment
}

export async function remove(
	db: D1Database,
	id: number,
): Promise<Comment | null> {
	const query = k.deleteFrom(CommentsTableName).where('id', '=', id).compile()
	const comment: Comment | null = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.first()

	return comment
}
