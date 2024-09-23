import { env as dynamic_env } from "$env/dynamic/private"
import { App } from 'octokit'

export async function get_github_app() {
  const app_id = dynamic_env.GITHUB_APP_CLIENT_ID || process.env.GITHUB_APP_CLIENT_ID || ""
  const private_key = dynamic_env.GITHUB_APP_SECRET || process.env.GITHUB_APP_SECRET || ""

  if (app_id === "") {
    throw new Error("GitHub app ID not found")
  } else if (private_key === "") {
    throw new Error("GitHub app private key not found")
  }

  return new App({ appId: app_id, privateKey: private_key })
}

/** @param {App} github_app */
export async function get_github_installation_octokit(github_app) {
  const install_id = dynamic_env.GITHUB_APP_INSTALL_ID || process.env.GITHUB_APP_INSTALL_ID || ""

  if (install_id === "") {
    throw new Error("GitHub app or installation ID not found")
  }

  return await github_app.getInstallationOctokit(parseInt(install_id))
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
