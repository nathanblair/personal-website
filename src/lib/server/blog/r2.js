import { transcribe_markdown } from '../github.js'

/** @type {import('@cloudflare/workers-types').R2Bucket} */
let r2_blogs_bucket

/** @param {App.Platform_Env} env */
export async function init(env) {
  if (!r2_blogs_bucket) {
    r2_blogs_bucket = env.blogs
  }
  return true
}

/**
 * @param {string} key
 * @param {string} title
 * @param {string} date
 * @param {string} content
 * @param {string} content_type
 */
export async function create(key, title, date, content, content_type) {
  return await r2_blogs_bucket.put(
    key,
    content,
    {
      httpMetadata: { contentType: content_type, },
      customMetadata: { title, date, }
    }
  )
}

/** @param {string} key */
export async function remove(key) {
  return await r2_blogs_bucket.delete(key)
}

/** @typedef {{blogs: import('$lib/blog.js').Blog[], status: number, headers: Headers}} BlogListResponse */
/** @typedef {{title: string, date: string, content: string, status: number, headers: Headers}} BlogObject */

/**
 *
 * @returns {Promise<BlogListResponse>}
 */
export async function list() {
  let r2_blogs
  try {
    r2_blogs = await r2_blogs_bucket.list({})
  } catch (/** @type {any} */ err) {
    console.error(err)
  }

  if (r2_blogs === undefined) {
    throw new Error("Failed to fetch blogs")
  }

  /** @type {import('$lib/blog.js').Blog[]} */
  const blogs = []

  let each_blog_head, title, date
  for (const each_blog of r2_blogs.objects) {
    each_blog_head = await r2_blogs_bucket.head(each_blog.key)
    title = each_blog_head?.customMetadata?.title || each_blog.key
    date = each_blog_head?.customMetadata?.date || "Unknown"

    blogs.push({ title, url: `/blog/${each_blog.key}`, date, })
  }

  return { blogs, status: 200, headers: new Headers() }
}

/**
 *
 * @param {string} key
 * @param {boolean} [raw=true]
 *
 * @returns {Promise<BlogObject>}
 */
export async function get(key, raw = true) {
  let blog = await r2_blogs_bucket.get(key, {})

  if (blog === null) {
    throw new Error(`Blog '${key}' not found`)
  }

  let content = await blog.text()

  if (raw && blog.httpMetadata?.contentType === 'text/markdown') {
    content = await transcribe_markdown(content)
  }

  let blog_head = await r2_blogs_bucket.head(key)

  const title = blog_head?.customMetadata?.title || key
  const date = blog_head?.customMetadata?.date
  if (!date) {
    throw new Error(`Blog '${key}' does not have a date`)
  }

  const headers = new Headers({
    'Content-Type': blog.httpMetadata?.contentType || 'text/plain',
    'Cache-Control': blog.httpMetadata?.cacheControl || 'no-cache',
  })

  return { title, date, content, status: 200, headers }
}
