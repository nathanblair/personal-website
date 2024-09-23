import { get_repo_path } from "$lib/server/github.js"
import { error, json } from "@sveltejs/kit"

/** @param {{request: any, platform: App.Platform}} params */
export async function GET({ platform }) {
  let blog_result
  try {
    blog_result = await get_repo_path('', platform.env)
  } catch (/** @type {any} */err) {
    return error(500, err)
  }
  const contents = blog_result.data

  const blogs = []

  // @ts-ignore
  for (const each_content of contents) {
    const each_blog = each_content
    const blog_parse = each_blog.name.split(';')
    const blog_date = new Date(blog_parse[0])
    const blog_title = blog_parse[1].split('.').slice(0, -1).join('')

    blogs.push({
      title: blog_title,
      url: `/blog/${encodeURIComponent(each_blog.name)}`,
      date: blog_date.toDateString()
    })
  }

  return json(blogs)
}
