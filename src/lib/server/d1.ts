import type { CommentTable } from '$lib/types/comment.ts'
import type { RockTable } from '$lib/types/rock'
import type { D1Database } from '@cloudflare/workers-types'
import type { Generated } from 'kysely'
import {
	DummyDriver,
	Kysely,
	SqliteAdapter,
	SqliteIntrospector,
	SqliteQueryCompiler,
} from 'kysely'

export interface SqliteMasterTable {
	id: Generated<number>
	name: string
	type: string
}

export interface Database {
	sqlite_master: SqliteMasterTable
	comments: CommentTable
	rocks: RockTable
}

export type Tables = keyof Database

export const k = new Kysely<Database>({
	dialect: {
		createAdapter: () => new SqliteAdapter(),
		createDriver: () => new DummyDriver(),
		createIntrospector: (db) => new SqliteIntrospector(db),
		createQueryCompiler: () => new SqliteQueryCompiler(),
	},
})

export async function has(db: D1Database, table: string) {
	const query = k
		.selectFrom('sqlite_master')
		.select('name')
		.where('type', '=', 'table')
		.where('name', '=', table)
		.compile()
	const result = await db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
	return result.results.length > 0
}
