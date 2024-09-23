import { get_repo_path, parse_platform_env, transcribe_markdown } from "$lib/github.js"
import { error } from "@sveltejs/kit"

/** @param {{request: any, platform: App.Platform}} params */
export async function GET({ request, platform }) {
  const path = request.url.split('/').pop()
  if (path === undefined) error(404, "Blog path not found")

  let app_id, private_key, installation_id
  try {
    ({ app_id, private_key, installation_id } = await parse_platform_env(platform.env))
  } catch (/** @type {any} */err) {
    return error(500, err)
  }

  let file_content
  try {
    file_content = await get_repo_path(path, app_id, private_key, installation_id)
  } catch (/** @type {any} */err) {
    return error(500, err)
  }

  // @ts-ignore
  let blog = atob(file_content.data.content)

  // @ts-ignore
  const file_type = file_content.data.name.split('.').pop()
  if (file_type === "md") {
    try {
      blog = await transcribe_markdown(blog, app_id, private_key, installation_id)
    } catch (/** @type {any} */err) {
      return error(500, err)
    }
  }

  return new Response(blog)
}
