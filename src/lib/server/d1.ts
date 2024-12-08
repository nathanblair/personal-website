import type { Database, Tables } from '$lib/types'
import type { Insertable } from 'kysely'
import {
	DummyDriver,
	Kysely,
	SqliteAdapter,
	SqliteIntrospector,
	SqliteQueryCompiler,
	type ColumnDataType,
	type CreateTableBuilder
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
	table: string
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

export function init(
	db: import('@cloudflare/workers-types').D1Database,
	table: string,
	column_map: Map<string, { data_type: ColumnDataType; nullable: boolean }>,
	foreign_key_constraints: Map<string, {
		foreign_table_name: string
		foreign_keys: string[]
		keys: string[]
	}> = new Map(),
	unique_key_constraints: Map<string, { a: string; b: string }> = new Map(),
) {
	let schema: CreateTableBuilder<string, string> = k.schema.createTable(table)
	schema = schema.addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())

	for (const [each_column_name, each_column] of column_map.entries()) {
		schema = schema.addColumn(
			each_column_name,
			each_column.data_type,
			each_column.nullable ? undefined : (col) => col.notNull(),
		)
	}

	for (const [foreign_key_name, foreign_key] of foreign_key_constraints) {
		schema = schema.addForeignKeyConstraint(
			foreign_key_name,
			foreign_key.foreign_keys,
			foreign_key.foreign_table_name,
			foreign_key.keys,
			(fk) => fk.onDelete('cascade'),
		)
	}

	for (const [unique_key_name, unique_key] of unique_key_constraints) {
		schema = schema.addUniqueConstraint(unique_key_name, [
			unique_key.a,
			unique_key.b,
		])
	}

	const query = schema.compile().sql
	console.log(query)
	return db.prepare(query).all()
}

export async function drop(
	db: import('@cloudflare/workers-types').D1Database,
	table: string
) {
	if (!(await has(db, table))) return Promise.resolve()

	const query = k.schema.dropTable(table).compile().sql
	console.log(query)
	return db.prepare(query).all()
}

export function remove(
	db: import('@cloudflare/workers-types').D1Database,
	table: Tables,
	id: number
) {
	const query = k.deleteFrom(table).where('id', '=', id).compile()
	return db.prepare(query.sql).bind(...query.parameters).all()
}

export function create(
	db: import('@cloudflare/workers-types').D1Database,
	table: Tables,
	records: Insertable<Database[Tables]>
) {
	const query = k.insertInto(table).values(records).compile()
	return db.prepare(query.sql).bind(...query.parameters).all()
}
