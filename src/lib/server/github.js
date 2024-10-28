import { env as dynamic_env } from '$env/dynamic/private'
import { App } from 'octokit'

const installationId = dynamic_env.GITHUB_APP_INSTALL_ID
const installId = parseInt(installationId)

const app = new App({
	appId: dynamic_env.GITHUB_APP_CLIENT_ID,
	privateKey: dynamic_env.GITHUB_APP_SECRET,
})
const octokit = await app.getInstallationOctokit(installId)

/**
 * @param {string} markdown markdown of the requested transcription
 */
export async function transcribe_markdown(markdown) {
	/** @type {import('@octokit/types').OctokitResponse<string, 200>} */
	let md_response
	try {
		md_response = await octokit.request('POST /markdown', { text: markdown })
	} catch (/** @type {any} */ err) {
		console.error(err)
		throw err
	}
	return md_response.data
}
