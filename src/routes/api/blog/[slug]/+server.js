import { get_repo_path, transcribe_markdown } from "$lib/server/github.js"
import { error } from "@sveltejs/kit"

/** @param {{request: any, platform: App.Platform}} params */
export async function GET({ request, platform }) {
  const path = request.url.split('/').pop()
  if (path === undefined) error(404, "Blog path not found")

  let file_content
  try {
    file_content = await get_repo_path(path, platform.env)
  } catch (/** @type {any} */err) {
    return error(500, err)
  }

  // @ts-ignore
  const file_type = file_content.data.name.split('.').pop()
  // @ts-ignore
  let blog = Buffer.from(file_content.data.content, file_content.data.encoding).toString()

  if (file_type === "md") {
    try {
      blog = await transcribe_markdown(blog, platform.env)
    } catch (/** @type {any} */err) {
      return error(500, err)
    }
  }

  return new Response(blog)
}
