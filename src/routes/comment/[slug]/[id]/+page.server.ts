import { comments_table_name } from '$lib/constants.ts'

export const ssr = true
export const prerender = false

export const actions = {
	delete: async ({ params, fetch, url }) => {
		const api_url = new URL(
			`/api/${comments_table_name}/${params.slug}/${params.id}`,
			url,
		)
		const deleted = await fetch(api_url, { method: 'DELETE' })
		return await deleted.json()
	},
}
