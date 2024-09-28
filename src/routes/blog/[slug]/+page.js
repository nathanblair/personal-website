import { parse } from '$lib/blog.js'
import { BlogPosting } from '$lib/structured_data/blog_posting.js'
import { my_person } from '$lib/structured_data/person.js'

/** @typedef {{ date: Date} & PageOutput} BlogPageOutput */

/** @type {import('./$types').PageLoad<BlogPageOutput>} */
export async function load({ params }) {
  const [date, title] = parse(params.slug)
  const description = ""

  const structured_data = new BlogPosting(date, title, my_person).structured_data

  return { title, description, date, structured_data }
}
