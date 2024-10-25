import { create } from '$lib/server/blog/r2.js'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const title = `Create Blog Post`
  const description = `Create a blog post`

  const blog_date = new Date()
  const blog_year = blog_date.getFullYear()
  const blog_month_number = blog_date.getMonth() + 1
  const blog_month = new String(blog_month_number).padStart(2, '0')
  const blog_day_number = blog_date.getDate()
  const blog_day = new String(blog_day_number).padStart(2, '0')
  const date = `${blog_year}-${blog_month}-${blog_day}`

  return {
    title,
    description,
    blog_title: null,
    date, content: null,
    content_type: "text/markdown"
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request }) => {
    const form_data = await request.formData()

    const blog_title = form_data.get("title")?.toString()
    if (blog_title === undefined) throw new Error("Blog title not found")

    const date = form_data.get("date")?.toString()
    if (date === undefined) throw new Error("Blog date not found")
    const blog_date = new Date(`${date}T00:00`).toDateString()

    const comments_enabled = Boolean(form_data.get("comments"))

    const blog_content = form_data.get("content")?.toString()
    if (blog_content === undefined) throw new Error("Blog content not found")

    const blog_content_type = form_data.get("format")?.toString()
    if (blog_content_type === undefined) throw new Error("Blog content type not found")

    const formatted_title = blog_title.replace(/ /g, '-')
    const key = `${formatted_title.toLowerCase()}-${Date.now().toString(36)}`

    await create(key, blog_title, blog_date, comments_enabled, blog_content, blog_content_type)

    redirect(303, "/blog")
  },
  cancel: async () => {
    redirect(303, "/blog")
  }
}
