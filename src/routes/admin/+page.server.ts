import type { PageServerLoad } from './$types'

export const ssr = true
export const prerender = false

export const load: PageServerLoad = async ({}) => {
	return {
		title: 'Admin',
		description: 'Adjust administrator settings',
	}
}
