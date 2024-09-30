import { get, remove } from '$lib/server/blog/r2.js'
import { BlogPosting } from '$lib/structured_data/blog_posting.js'
import { my_person } from '$lib/structured_data/person.js'
import { error, redirect } from '@sveltejs/kit'

/** @typedef {{ date: Date, content: string} & PageOutput} BlogPageOutput */

/** @type {import('./$types').PageServerLoad<BlogPageOutput>} */
export async function load({ params }) {
  /** @type {{title?: string, date?: string, content?: string, rest?: any}} */
  let { title, date, content, rest } = {}
  try {
    ({ title, date, content, ...rest } = await get(params.slug))
  } catch (/** @type {any} */ err) {
    return error(404, err.message)
  }

  const description = ""

  const blog_date = new Date(date)
  const structured_data = new BlogPosting(blog_date, title, my_person).structured_data

  return { title, description, content, date: blog_date, structured_data }
}

/** @type {import('./$types').Actions} */
export const actions = {
  remove: async ({ params }) => {
    await remove(params.slug)
    redirect(303, "/blog")
  },
  edit: async ({ params }) => {
    redirect(303, `/blog/edit/${params.slug}`)
  }
}
