import { error } from '@sveltejs/kit'

export const ssr = true
export const prerender = false

export const actions = {
	delete: async ({ params, fetch, url }) => {
		const api_url = new URL(`/api/comment/${params.slug}/${params.id}`, url)
		const deleted = await fetch(api_url, { method: 'DELETE', })
		return await deleted.json()
	},
	edit: async ({ request, url, fetch, params }) => {
		const formData = await request.formData()
		const content = formData.get('body')?.toString()
		if (!content) error(500, 'Comment content not found')

		url.searchParams.delete('/edit')
		const api_url = new URL(`/api/comment/${params.slug}/${params.id}${url.search}`, url)
		const edited = await fetch(api_url, { method: 'PATCH', body: JSON.stringify({ content }) })
		return await edited.json()
	},
}
