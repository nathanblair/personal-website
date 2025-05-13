import type { Generated, Selectable } from 'kysely'

export interface RocksTable {
	id: Generated<number>
	commentId: number
	userId: number
}

export interface Rock extends Selectable<RocksTable> {}
