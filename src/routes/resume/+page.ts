import { name } from '$lib/constants'
import type { PageLoad } from './$types'

export const ssr = false
export const prerender = true

export const load: PageLoad = () => {
	const title = 'Resumé'
	const description = `${name}'s Curriculum Vitae`
	const structured_data = undefined

	return { title, description, structured_data }
}
