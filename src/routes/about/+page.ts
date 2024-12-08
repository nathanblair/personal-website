import { name } from '$lib/constants'
import { my_profile } from '$lib/structured_data/profile_page'
import type { PageLoad } from './$types'

export const ssr = false
export const prerender = true

export const load: PageLoad = () => {
	const title = 'About'
	const description = `All about ${name}`
	const structured_data = my_profile.structured_data

	return { title, description, structured_data }
}
