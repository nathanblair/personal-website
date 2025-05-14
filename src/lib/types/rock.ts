import type { Generated, Insertable, Selectable } from 'kysely'

export interface RockTable {
	id: Generated<number>
	commentId: number
	userId: number
}

export interface Rock extends Selectable<RockTable> {}
export interface NewRock extends Insertable<RockTable> {}
