import type { Database, Tables } from '$lib/types'
import type { Insertable } from 'kysely'
import {
	DummyDriver,
	Kysely,
	SqliteAdapter,
	SqliteIntrospector,
	SqliteQueryCompiler,
} from 'kysely'

export const k = new Kysely<Database>({
	dialect: {
		createAdapter: () => new SqliteAdapter(),
		createDriver: () => new DummyDriver(),
		createIntrospector: (db) => new SqliteIntrospector(db),
		createQueryCompiler: () => new SqliteQueryCompiler(),
	},
})

export async function has(
	db: import('@cloudflare/workers-types').D1Database,
	table: string,
) {
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

export async function drop(
	db: import('@cloudflare/workers-types').D1Database,
	table: string,
) {
	if (!(await has(db, table))) return false

	const query = k.schema.dropTable(table).compile().sql
	console.log(query)
	const results = await db.prepare(query).all()

	if (results.error) return results.error

	return false
}

export function remove(
	db: import('@cloudflare/workers-types').D1Database,
	table: Tables,
	id: number,
) {
	const query = k.deleteFrom(table).where('id', '=', id).compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

export function create(
	db: import('@cloudflare/workers-types').D1Database,
	table: Tables,
	records: Insertable<Database[Tables]>,
) {
	const query = k.insertInto(table).values(records).compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}
