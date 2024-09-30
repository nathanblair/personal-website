import { create, get } from '$lib/server/blog/r2.js'
import { error, redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const title = `Edit Blog Post`
  const description = `Edit a blog post`

  /** @type {{blog_title?: string, date?: string, content?: string, status?: number, headers?: Headers}} */
  let { blog_title, date, content, status, headers } = {}
  try {
    ({ title: blog_title, date, content, status, headers } = await get(params.slug))
  } catch (/** @type {any} */ err) {
    return error(404, err.message)
  }

  const blog_date = new Date(date)
  const blog_year = blog_date.getFullYear()
  const blog_month_number = blog_date.getMonth() + 1
  const blog_month = new String(blog_month_number).padStart(2, '0')
  const blog_day_number = blog_date.getDate()
  const blog_day = new String(blog_day_number).padStart(2, '0')
  date = `${blog_year}-${blog_month}-${blog_day}`

  return { title, description, blog_title, date, content, content_type: headers?.get("Content-Type") }
}

/** @type {import('./$types').Actions} */
export const actions = {
  update: async ({ request, params }) => {
    const form_data = await request.formData()

    const blog_title = form_data.get("title")?.toString()
    if (blog_title === undefined) throw new Error("Blog title not found")

    const date = form_data.get("date")?.toString()
    if (date === undefined) throw new Error("Blog date not found")
    const blog_date = new Date(`${date}T00:00`).toDateString()

    const blog_content = form_data.get("content")?.toString()
    if (blog_content === undefined) throw new Error("Blog content not found")

    const blog_content_type = form_data.get("format")?.toString()
    if (blog_content_type === undefined) throw new Error("Blog content type not found")

    await create(params.slug, blog_title, blog_date, blog_content, blog_content_type)

    redirect(303, "/blog")
  },
  cancel: async () => {
    redirect(303, "/blog")
  }
}
