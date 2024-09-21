import { name } from '$lib/constants.js'
import { get_github_app, get_github_installation_octokit, get_github_repo } from "$lib/server/github.js"

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const title = `Blog`
  const description = `The blog of ${name}`

  const github_app = await get_github_app()
  const { repository_owner, repository_name } = await get_github_repo(github_app)
  const octokit = await get_github_installation_octokit(github_app)

  const content_request = octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: repository_owner,
    repo: repository_name,
    path: '',
  })

  return { title, description, content_request }
}
