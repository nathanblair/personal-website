import { name } from '$lib/constants'
import { my_profile } from '$lib/structured_data/profile_page'
import type { PageLoad } from './$types'

export const ssr = false

export const load: PageLoad = () => {
	return {
		title: 'Home',
		description: name,
		structured_data: my_profile.structured_data,
	}
}
