import { parse } from '$lib/blog.js'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const [_, title] = parse(params.slug)
  const description = ""

  return { title, description }
}
