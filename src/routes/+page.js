export const ssr = false

import { name } from '$lib/constants.js'
import { my_profile } from '$lib/structured_data/profile_page.js'

export function load() {
	const title = 'Home'
	const description = name
	const structured_data = my_profile.structured_data

	return { title, description, structured_data }
}
