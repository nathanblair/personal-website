import { env as dynamic_env } from "$env/dynamic/private"
import { App } from 'octokit'

/** @type {import('octokit').App} */
let github_app
/** @type {import('octokit').Octokit} */
let octokit

/** @type {string} */
let repository_owner
/** @type {string} */
let repository_name

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
    repository_owner = each.repository.full_name.split('/')[0]
    repository_name = each.repository.full_name.split('/')[1]
  })

  return true
}

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

/**
 *
 * @param {string} path Path of the requested document
 * @param {URL} url
 * @param {Cache} cache
 * @param {*} context
 *
 * @returns {Promise<Response>}
 */
export async function get_repo_path(path, url, cache, context) {
  /** @type {Response | undefined} */
  let cached
  try {
    cached = await cache.match(url)
  } catch (/** @type {any} */err) {
    console.error(err)
  }

  if (cached !== undefined) {
    console.log(`Cache hit: ${url}`)
    return cached
  }
  console.log(`Cache miss: ${url}`)

  let octo_response
  try {
    octo_response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: repository_owner,
      repo: repository_name,
      path: decodeURIComponent(path),
    })
  } catch (/** @type {any} */err) {
    console.error(err)
    return err
  }

  /** @type {HeadersInit} */
  const headers = []
  for (const [key, value] of Object.entries(octo_response.headers)) {
    if (value === undefined || value === null) continue
    headers.push([key, value.toString()])
  }

  cached = new Response(JSON.stringify(octo_response.data), {
    status: octo_response.status,
    headers: headers,
  })

  if (cached === undefined) throw new Error(`Error fetching ${path}`)

  context.waitUntil(cache.put(url, cached.clone()))
  return cached
}

/** @param {string} markdown markdown of the requested transcription */
export async function transcribe_markdown(markdown) {
  const md = await octokit.request('POST /markdown', {
    text: markdown,
    headers: { 'X-GitHub-Api-Version': '2022-11-28' }
  })

  return md.data
}

/**
 *
 * @param {URL} url
 * @param {Cache} cache
 * @param {*} context
 * @returns
 */
export async function fetch_blogs(url, cache, context) {
  let blog_response
  try {
    blog_response = await get_repo_path('', url, cache, context)
  } catch (/** @type {any} */err) {
    throw new Error(`Error fetching blog content: ${err}`)
  }

  /** @type {Blog[]} */
  const blogs = []

  for (const each_content of await blog_response.json()) {
    const each_blog = each_content
    const blog_parse = each_blog.name.split(';')
    const blog_date = new Date(blog_parse[0])
    const blog_title = blog_parse[1].split('.').slice(0, -1).join('')

    blogs.push({
      title: blog_title,
      url: `/blog/${encodeURIComponent(each_blog.name)}`,
      date: blog_date.toDateString()
    })
  }

  return blogs
}
