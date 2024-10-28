export const ssr = false
export const prerender = true

import { name } from '$lib/constants.js'

/** @type {import('./$types.js').PageLoad<PageOutput>} */
export function load() {
	const title = 'Resumé'
	const description = `${name}'s Curriculum Vitae`
	const structured_data = undefined

	return { title, description, structured_data }
}
