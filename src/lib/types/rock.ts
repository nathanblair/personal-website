import type { Generated, Insertable, Selectable } from 'kysely'

export type RockTable = {
	id: Generated<number>
	commentId: number
	userId: number
}

export type Rock = Selectable<RockTable> & {}
export type NewRock = Insertable<RockTable> & {}

export type CommentsRockedState = Record<
	string,
	{ count: number; rocked: boolean }
>
