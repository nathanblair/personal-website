import type { Actions } from './$types'

export const ssr = true
export const prerender = false

export const actions: Actions = {
	rock: async ({ url, params, fetch }) => {
		const api_url = new URL(`/api/rock/${params.slug}/${params.id}`, url)
		const rock_response = await fetch(api_url, { method: 'PUT' })
		return await rock_response.json()
	},
}
