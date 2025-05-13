import { MyName } from '$lib/constants'
import type { PageLoad } from './$types'

export const ssr = false
export const prerender = true

export const load: PageLoad = () => {
	const title = 'Resumé'
	const description = `${MyName}'s Curriculum Vitae`
	const structuredData = undefined

	return { title, description, structuredData }
}
