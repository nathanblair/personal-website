import { env as dynamic_env } from "$env/dynamic/private"
import { App } from 'octokit'

/** @type {import('octokit').App} */
let github_app
/** @type {import('octokit').Octokit} */
export let octokit

/** @type {string} */
export let owner

/** @type {string} */
export let repo

/** @param {App.Platform_Env} env */
export async function parse_platform_env(env) {
  /** @type {string?} */
  let app_id
  try {
    app_id = await env.github_blog_app.get('GITHUB_APP_CLIENT_ID') || dynamic_env.GITHUB_APP_CLIENT_ID
  } catch (/** @type {any} */err) {
    throw new Error(`GitHub app ID not found: ${err}`)
  }

  /** @type {string?} */
  let private_key
  try {
    private_key = dynamic_env.GITHUB_APP_SECRET
  } catch (/** @type {any} */err) {
    throw new Error(`GitHub app private key not found: ${err}`)
  }

  /** @type {string?} */
  let install_id
  try {
    install_id = await env.github_blog_app.get('GITHUB_APP_INSTALL_ID') || dynamic_env.GITHUB_APP_INSTALL_ID
  } catch (/** @type {any} */err) {
    throw new Error(`GitHub app installation ID not found: ${err}`)
  }

  if (app_id === null || app_id === undefined) {
    throw new Error("GitHub app ID not found")
  } else if (private_key === undefined) {
    throw new Error("GitHub app private key not found")
  } else if (install_id === null || install_id === undefined) {
    throw new Error("GitHub app or installation ID not found")
  }

  const installation_id = parseInt(install_id)

  return { app_id, private_key, installation_id }
}

/** @param {App.Platform_Env} env */
export async function init(env) {
  let { app_id, private_key, installation_id } = await parse_platform_env(env)

  if (!github_app) {
    github_app = new App({ appId: app_id, privateKey: private_key })
  }
  if (!octokit) {
    octokit = await github_app.getInstallationOctokit(installation_id)
  }

  await github_app.eachRepository(each => {
    owner = each.repository.full_name.split('/')[0]
    repo = each.repository.full_name.split('/')[1]
  })

  return true
}

/** @param {string} markdown markdown of the requested transcription */
export async function transcribe_markdown(markdown) {
  const md = await octokit.request('POST /markdown', { text: markdown, })
  return md.data
}
