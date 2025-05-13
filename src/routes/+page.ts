import { MyName } from '$lib/constants'
import { myProfile } from '$lib/structured_data/profile_page'
import type { PageLoad } from './$types'

export const ssr = false

export const load: PageLoad = () => {
	return {
		title: 'Home',
		description: MyName,
		structuredData: myProfile.structured_data,
	}
}
