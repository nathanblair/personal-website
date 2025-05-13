import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface CommentsTable {
	id: Generated<number>
	slug: string
	datePosted: string
	dateEdited?: string | null
	userId: number
	userName: string
	userImage?: string | null
	body: string
}

export interface Comment extends Selectable<CommentsTable> {}
export interface NewComment extends Insertable<CommentsTable> {}
export interface CommentUpdate extends Updateable<CommentsTable> {}
