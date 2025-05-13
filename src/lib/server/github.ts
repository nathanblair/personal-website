import { env as dynamicEnv } from '$env/dynamic/private'
import { App } from 'octokit'

const installationId = dynamicEnv.GITHUB_APP_INSTALL_ID
const installId = parseInt(installationId)

const app = new App({
	appId: dynamicEnv.GITHUB_APP_CLIENT_ID,
	privateKey: dynamicEnv.GITHUB_APP_SECRET,
})
const octokit = await app.getInstallationOctokit(installId)
