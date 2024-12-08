import { comments_table_name, rocks_table_name } from '$lib/constants'
import { handle as auth_handle } from '$lib/server/auth'
import { has } from '$lib/server/d1'
import { type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	if (event.platform?.env) {
		try {
			event.locals.db = event.platform.env.db
		} catch (err: any) { console.debug(err.message) }
		try {
			event.locals.blogs = event.platform.env.blogs
		} catch (err: any) { console.debug(err.message) }
	}

	if (event.locals.db) {
		if (!(await has(event.locals.db, comments_table_name)))
			console.error('Comments not initialized')
		if (!(await has(event.locals.db, rocks_table_name)))
			console.error('Rocks not initialized')
	}

	return await auth_handle({ event, resolve })
}
