import { env as dynamic_env } from "$env/dynamic/private"
import { parse } from "$lib/blog.js"
import { App } from 'octokit'

/** @type {import('octokit').App} */
let github_app
/** @type {import('octokit').Octokit} */
let octokit

/** @type {string} */
let owner
/** @type {string} */
let repo

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

/**
 *
 * @param {URL} url
 *
 * @returns {Promise<[import('$lib/blog.js').Blog[], number, object]>}
 */
export async function fetch_blogs(url) {
  let octo_response
  try {
    octo_response = await octokit.rest.repos.getContent({ owner, repo, path: '' })
  } catch (/** @type {any} */err) {
    throw new Error(`Error fetching blog content: ${err}`)
  }

  const blog_json = octo_response.data

  /** @type {import('$lib/blog.js').Blog[]} */
  const blogs = []

  // @ts-ignore
  for (const each_content of blog_json) {
    const [blog_date, blog_title] = parse(each_content.name)

    blogs.push({
      title: blog_title,
      url: `/blog/${encodeURIComponent(each_content.name)}`,
      date: blog_date.toDateString()
    })
  }

  return [blogs, octo_response.status, octo_response.headers]
}

/**
 *
 * @param {URL} url
 *
 * @returns {Promise<[string, number, object]>}
 */
export async function fetch_blog(url) {
  let path = url.pathname.split('/').pop()
  if (path === undefined) throw new Error(`Blog '${path}' not found`)
  path = decodeURIComponent(path)

  let octo_response
  try {
    octo_response = await octokit.rest.repos.getContent({ owner, repo, path })
  } catch (/** @type {any} */err) {
    throw new Error(`Error fetching blog content: ${err}`)
  }

  const file = octo_response.data
  // @ts-ignore
  let blog = atob(file.content)

  // @ts-ignore
  const file_type = file.name.split('.').pop()
  if (file_type === "md") {
    try {
      blog = await transcribe_markdown(blog)
    } catch (/** @type {any} */err) {
      throw new Error(`Error transcribing markdown: ${err}`)
    }
  }

  return [blog, octo_response.status, octo_response.headers]
}
