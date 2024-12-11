import { comments_table_name } from '$lib/constants'
import { drop } from '$lib/server/d1'
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
		const api_url = new URL(
			`/api/${comments_table_name}/${params.slug}${url.search}`,
			url,
		)
		const submitted = await fetch(api_url, {
			method: 'PUT',
			body: JSON.stringify({ content }),
		})
		return await submitted.json()
	},
}
