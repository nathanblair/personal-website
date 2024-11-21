export const ssr = false

import { name } from '$lib/constants.js'
import { my_profile } from '$lib/structured_data/profile_page.js'

export function load() {
	return {
		title: 'Home',
		description: name,
		structured_data: my_profile.structured_data,
	}
}
