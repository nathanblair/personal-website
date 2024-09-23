import { App } from 'octokit'

/** @param {App.Platform_Env} env */
export async function parse_platform_env(env) {
  /** @type {string?} */
  let app_id
  try {
    app_id = await env.github_blog_app.get('GITHUB_APP_CLIENT_ID')
  } catch (/** @type {any} */err) {
    throw new Error(`GitHub app ID not found: ${err}`)
  }

  /** @type {string?} */
  let private_key
  try {
    private_key = env.GITHUB_APP_SECRET
  } catch (/** @type {any} */err) {
    throw new Error(`GitHub app private key not found: ${err}`)
  }

  /** @type {string?} */
  let install_id
  try {
    install_id = await env.github_blog_app.get('GITHUB_APP_INSTALL_ID')
  } catch (/** @type {any} */err) {
    throw new Error(`GitHub app installation ID not found: ${err}`)
  }

  if (app_id === null) {
    throw new Error("GitHub app ID not found")
  } else if (private_key === undefined) {
    throw new Error("GitHub app private key not found")
  } else if (install_id === null) {
    throw new Error("GitHub app or installation ID not found")
  }

  const installation_id = parseInt(install_id)

  return { app_id, private_key, installation_id }
}

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
 * @param {string} app_id GitHub App ID
 * @param {string} private_key GitHub App private key
 * @param {number} install_id GitHub App installation ID
 */
export async function get_repo_path(path, app_id, private_key, install_id) {
  const github_app = await get_github_app(app_id, private_key)
  const octokit = await get_github_installation_octokit(github_app, install_id)
  const { repository_owner, repository_name } = await get_github_repo(github_app)

  return await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: repository_owner,
    repo: repository_name,
    path: decodeURIComponent(path),
  })
}

/**
 * @param {string} markdown markdown of the requested transcription
 * @param {string} app_id GitHub App ID
 * @param {string} private_key GitHub App private key
 * @param {number} install_id GitHub App installation ID
 */
export async function transcribe_markdown(markdown, app_id, private_key, install_id) {
  const github_app = await get_github_app(app_id, private_key)
  const octokit = await get_github_installation_octokit(github_app, install_id)

  const md = await octokit.request('POST /markdown', {
    text: markdown,
    headers: { 'X-GitHub-Api-Version': '2022-11-28' }
  })

  return md.data
}
