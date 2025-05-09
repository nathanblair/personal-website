import { env as dynamic_env } from '$env/dynamic/private'
import { App } from 'octokit'

const installationId = dynamic_env.GITHUB_APP_INSTALL_ID
const installId = parseInt(installationId)

const app = new App({
	appId: dynamic_env.GITHUB_APP_CLIENT_ID,
	privateKey: dynamic_env.GITHUB_APP_SECRET,
})
const octokit = await app.getInstallationOctokit(installId)
