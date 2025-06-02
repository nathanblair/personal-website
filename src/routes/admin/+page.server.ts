import type { PageServerLoad } from './$types'

import { CommentsTableName, RocksTableName } from '$lib/constants.ts'
import { entries } from '$lib/server/blog'
import {
	create as createComments,
	drop as dropComments,
} from '$lib/server/comment.ts'
import { has } from '$lib/server/d1.ts'
import { remove as removeBlog } from '$lib/server/r2.ts'
import { create as createRocks, drop as dropRocks } from '$lib/server/rock.ts'
import type { Session } from '$lib/types/auth.ts'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const load: PageServerLoad = async ({ locals }) => {
	const session = (await locals.auth()) as Session
	if (!session) error(404, 'Not signed in')

	if (!session.user?.admin) error(403, 'Unauthorized')

	return {
		title: 'Admin',
		description: 'Adjust administrator settings',
		commentsInitialized: has(locals.db, CommentsTableName),
		rocksInitialized: has(locals.db, RocksTableName),
	}
}

export const actions = {
	listPrefixes: async ({ locals, request }) => {
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (!session.user?.admin) throw new Error('Unauthorized')

		const formData = await request.formData()
		const prefix = formData.get('prefix')?.toString()
		const delimiter = formData.get('delimiter')?.toString()

		const prefixes = await entries(locals.blogs, prefix, delimiter)
		console.log('Prefixes', prefixes)

		return { prefixes }
	},
	removeBlog: async ({ locals, request }) => {
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (!session.user?.admin) throw new Error('Unauthorized')

		const formData = await request.formData()
		const key = formData.get('blogKey')?.toString()
		if (!key) throw new Error('Blog key not found')

		await removeBlog(locals.blogs, key)
	},
	dropComments: async ({ locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (session.user?.admin !== true) throw new Error('Unauthorized')

		await dropComments(locals.db)
		return
	},
	createComments: async ({ locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (session.user?.admin !== true) throw new Error('Unauthorized')

		await createComments(locals.db)
		return
	},
	dropRocks: async ({ locals }) => {
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (session.user?.admin !== true) throw new Error('Unauthorized')

		await dropRocks(locals.db)
		return
	},
	createRocks: async ({ locals }) => {
		console.log('Rocks table created')
		const session = (await locals.auth()) as Session
		if (!session) throw new Error('Not signed in')

		if (session.user?.admin !== true) throw new Error('Unauthorized')

		await createRocks(locals.db)
		return
	},
}
