import { get_repo_path, transcribe_markdown } from "$lib/github.js"
import { error, text } from "@sveltejs/kit"

/** @param {{request: any, platform: App.Platform}} params */
export async function GET({ request, platform }) {
  const path = request.url.split('/').pop()
  if (path === undefined) error(404, "Blog path not found")

  let file_content
  try {
    // @ts-ignore
    file_content = await get_repo_path(path, path, platform.caches.default, platform.context)
  } catch (/** @type {any} */err) {
    return error(500, err)
  }

  // @ts-ignore
  let blog = atob(file_content.data.content)

  // @ts-ignore
  const file_type = file_content.data.name.split('.').pop()
  if (file_type === "md") {
    try {
      blog = await transcribe_markdown(blog)
    } catch (/** @type {any} */err) {
      return error(500, err)
    }
  }

  return text(blog)
}
