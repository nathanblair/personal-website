import { MyName } from '$lib/constants'
import { myProfile } from '$lib/structured_data/profile_page'
import type { PageLoad } from './$types'

export const ssr = false
export const prerender = true

export const load: PageLoad = () => {
	const title = 'About'
	const description = `All about ${MyName}`
	const structuredData = myProfile.structured_data

	return { title, description, structuredData }
}
