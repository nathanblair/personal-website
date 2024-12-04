import {
	DummyDriver,
	Kysely,
	SqliteAdapter,
	SqliteIntrospector,
	SqliteQueryCompiler,
} from 'kysely'

export const k = new Kysely({
	dialect: {
		createAdapter: () => new SqliteAdapter(),
		createDriver: () => new DummyDriver(),
		createIntrospector: (db) => new SqliteIntrospector(db),
		createQueryCompiler: () => new SqliteQueryCompiler(),
	},
})

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} table
 */
export async function has(db, table) {
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

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} table
 * @param {Map<string, {data_type: import('kysely').ColumnDataType, nullable: boolean}>} column_map
 * @param {Map<string, {
 *    foreign_table_name: string,
 *    foreign_keys: string[],
 *    keys: string[]
 * }>} [foreign_key_constraints]
 * @param {Map<string, {a: string, b: string}>} [unique_key_constraints]
 */
export async function init(
	db,
	table,
	column_map,
	foreign_key_constraints = new Map(),
	unique_key_constraints = new Map(),
) {
	/** @type {import('kysely').CreateTableBuilder<string, string>} */
	let schema = k.schema.createTable(table)
	schema = schema.addColumn('id', 'integer', (col) =>
		col.autoIncrement().primaryKey(),
	)

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

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} table
 */
export async function drop(db, table) {
	if (!(await has(db, table))) return Promise.resolve()

	const query = k.schema.dropTable(table).compile().sql
	console.log(query)
	return db.prepare(query).all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} table
 * @param {number} id
 */
export async function remove(db, table, id) {
	const query = k.deleteFrom(table).where('id', '=', id).compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} table
 * @param {any} records
 */
export async function create(db, table, records) {
	const query = k.insertInto(table).values(records).compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} table
 * @param {number} id
 * @param {any} record
 */
export async function update(db, table, id, record) {
	const query = k.updateTable(table).set(record).where('id', '=', id).compile()
	return db
		.prepare(query.sql)
		.bind(...query.parameters)
		.all()
}

/**
 * @param {import('@cloudflare/workers-types').D1Database} db
 * @param {string} table
 * @param {string} slug
 * @param {number} [id]
 */
export async function retrieve(db, table, slug, id) {
	let query = k.selectFrom(table).selectAll().where('slug', '=', slug)

	if (id) query = query.where('id', '=', id)
	const q = query.compile()

	return db
		.prepare(q.sql)
		.bind(...q.parameters)
		.all()
}
