import { get_github_app, get_github_installation_octokit, get_github_repo } from "$lib/server/github.js"

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const title = params.slug
  const description = ""

  const github_app = await get_github_app()
  const { repository_owner, repository_name } = await get_github_repo(github_app)
  const octokit = await get_github_installation_octokit(github_app)

  const file_content = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: repository_owner,
    repo: repository_name,
    path: decodeURIComponent(params.slug),
  })

  // @ts-ignore
  const file_type = file_content.data.name.split('.').pop()

  // @ts-ignore
  let blog = Buffer.from(file_content.data.content, file_content.data.encoding).toString()

  if (file_type === "md") {
    const md = await octokit.request('POST /markdown', {
      text: blog,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    blog = md.data
  }

  return { title, description, blog }
}
