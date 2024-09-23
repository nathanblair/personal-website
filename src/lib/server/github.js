import { App } from 'octokit'

/**
 * @param {string} appId
 * @param {string} privateKey
 */
export async function get_github_app(appId, privateKey) {
  return new App({ appId, privateKey })
}

/**
 * @param {App} github_app
 * @param {Number} install_id
 */
export async function get_github_installation_octokit(github_app, install_id) {
  return await github_app.getInstallationOctokit(install_id)
}

/** @param {App} github_app */
export async function get_github_repo(github_app) {
  let repository_owner = ""
  let repository_name = ""

  await github_app.eachRepository(each => {
    repository_owner = each.repository.full_name.split('/')[0]
    repository_name = each.repository.full_name.split('/')[1]
  })

  return { repository_owner, repository_name }
}

/**
 * @param {string} path Path of the requested document
 * @param {{GITHUB_APP_CLIENT_ID: string, GITHUB_APP_SECRET: string, GITHUB_APP_INSTALL_ID: number}} platform_env The Plaform's environment variables
 */
export async function get_repo_path(path, platform_env) {
  const app_id = platform_env.GITHUB_APP_CLIENT_ID
  const private_key = platform_env.GITHUB_APP_SECRET
  const install_id = platform_env.GITHUB_APP_INSTALL_ID

  if (app_id === undefined) {
    throw new Error("GitHub app ID not found")
  } else if (private_key === undefined) {
    throw new Error("GitHub app private key not found")
  } else if (install_id === undefined) {
    throw new Error("GitHub app or installation ID not found")
  }

  const github_app = await get_github_app(app_id, private_key)
  const octokit = await get_github_installation_octokit(github_app, install_id)
  const { repository_owner, repository_name } = await get_github_repo(github_app)

  console.log(`Fetching: ${path}`)

  return await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: repository_owner,
    repo: repository_name,
    path: decodeURIComponent(path),
  })
}

/**
 * @param {string} markdown markdown of the requested transcription
 * @param {{GITHUB_APP_CLIENT_ID: string, GITHUB_APP_SECRET: string, GITHUB_APP_INSTALL_ID: number}} platform_env The Plaform's environment variables
 */
export async function transcribe_markdown(markdown, platform_env) {
  const app_id = platform_env.GITHUB_APP_CLIENT_ID
  const private_key = platform_env.GITHUB_APP_SECRET
  const install_id = platform_env.GITHUB_APP_INSTALL_ID

  if (app_id === undefined) {
    throw new Error("GitHub app ID not found")
  } else if (private_key === undefined) {
    throw new Error("GitHub app private key not found")
  } else if (install_id === undefined) {
    throw new Error("GitHub app or installation ID not found")
  }

  const github_app = await get_github_app(app_id, private_key)
  const octokit = await get_github_installation_octokit(github_app, install_id)

  const md = await octokit.request('POST /markdown', {
    text: markdown,
    headers: { 'X-GitHub-Api-Version': '2022-11-28' }
  })

  return md.data
}
