import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export type CommentTable = {
	id: Generated<number>
	slug: string
	datePosted: string
	dateEdited?: string | null
	userId: number
	userName: string
	userImage?: string | null
	body: string
}

export type Comment = Selectable<CommentTable> & {}
export type NewComment = Insertable<CommentTable> & {}
export type CommentUpdate = Updateable<CommentTable> & {}
