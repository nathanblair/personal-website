import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface CommentTable {
	id: Generated<number>
	slug: string
	datePosted: string
	dateEdited?: string | null
	userId: number
	userName: string
	userImage?: string | null
	body: string
}

export interface Comment extends Selectable<CommentTable> {}
export interface NewComment extends Insertable<CommentTable> {}
export interface CommentUpdate extends Updateable<CommentTable> {}
