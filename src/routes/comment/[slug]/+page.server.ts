import { comments_table_name } from '$lib/constants'
import { drop, init } from '$lib/server/d1'
import type { Session } from '$lib/types'
import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const actions = {
	submit: async ({ request, url, params, fetch }) => {
		const form = await request.formData()
		const content = form.get('comment')?.toString()
		if (!content) error(500, 'Comment content not found')

		url.searchParams.delete('/submit')
		const api_url = new URL(`/api/comment/${params.slug}${url.search}`, url)
		const submitted = await fetch(api_url, { method: 'PUT', body: JSON.stringify({ content }) })
		return await submitted.json()
	},
	clean: async ({ locals }) => {
		const session = await locals.auth() as Session
		if (!session) error(404, 'Not signed in')

		if (!session.user?.admin) error(403, 'Unauthorized')

		return drop(locals.db, comments_table_name)
	},
	init: async ({ locals }) => {
		const session = await locals.auth() as Session
		if (!session) error(404, 'Not signed in')
		if (!session.user?.admin) error(403, 'Unauthorized')

		return init(locals.db, comments_table_name, new Map([
			['slug', { data_type: 'text', nullable: false }],
			['user_id', { data_type: 'integer', nullable: false }],
			['user_name', { data_type: 'text', nullable: false }],
			['user_image', { data_type: 'text', nullable: true }],
			['body', { data_type: 'text', nullable: false }],
			['date_posted', { data_type: 'datetime', nullable: false }],
			['date_edited', { data_type: 'datetime', nullable: true }],
		]))
	},
}
