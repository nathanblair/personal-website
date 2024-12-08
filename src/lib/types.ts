import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export type PageOutput = { title: string; description: string; structured_data?: object }

export type Session = import('@auth/sveltekit').Session & { user?: { admin?: boolean, id: number } }

export interface Database {
	sqlite_master: SqliteMasterTable
	comments: CommentsTable
	rocks: RocksTable
}

export type Tables = keyof Database

export interface SqliteMasterTable { name: string, type: string }

export interface CommentsTable {
	id: Generated<number>
	slug: string
	date_posted: string
	date_edited: string | null | undefined
	user_id: number
	user_name: string
	user_image: string | null | undefined
	body: string
}

export interface RocksTable { id: Generated<number>, comment_id: number, user_id: number }

export type Comment = Selectable<CommentsTable>
export type NewComment = Insertable<CommentsTable>
export type CommentUpdate = Updateable<CommentsTable>
export type Rock = Selectable<RocksTable>
