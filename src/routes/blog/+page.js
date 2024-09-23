import { name } from '$lib/constants.js'

/** @type {import('./$types').PageLoad} */
export async function load() {
  const title = `Blog`
  const description = `The blog of ${name}`

  return { title, description }
}
