/** @typedef {{title: string, description: string, structured_data?: object}} PageOutput */

/** @typedef {(import('@auth/sveltekit').Session & { user?: {admin?: boolean}})} Session */

/** @typedef {{
	date_edited?: string?,
	body?: string,
}} EditComment */

/** @typedef {{
	slug: string,
	date_posted: string,
	date_edited?: string?,
  user_id: string,
  user_name: string,
  user_image?: string?,
  body: string,
}} NewComment */

/** @typedef {{
  id: string,
	slug: string,
	date_posted: string,
	date_edited: string?,
	user_id: string,
  user_name: string,
  user_image?: string?,
	rock_count: number,
	rocked_by_user: boolean,
  body: string,
}} BlogComment */
