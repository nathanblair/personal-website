import { page_default_title } from "./constants.js"

export const blog_placeholder_class_name = "blog-placeholder"

const cloud_host_endpoint = "https://api.github.com"
const tree_path = "/repos/nathanblair/blog/git/trees/default"
const content_path = "/repos/nathanblair/blog/contents/"
const cloud_host_blog_tree_endpoint = `${cloud_host_endpoint}${tree_path}`
const cloud_host_blog_content_endpoint = `${cloud_host_endpoint}${content_path}`

/**
 * @typedef {{
 * path: string,
 * mode: string,
 * type: "tree" | "blob",
 * sha: string,
 * url: string,
 * }} Entry
 */

/** @typedef {Array<Entry>} Tree */

/**
 * @typedef {{
 *  sha: string,
 *  url: string,
 *  tree: Tree,
 * }} Payload
 */

/** @typedef {[string, string, string]} ArticleDateArray */

/** @typedef {{file_name: string, date: ArticleDateArray, content: string}} Article */

/** @param {Entry} each_entry */
function is_valid_article(each_entry) {
  return (
    !isNaN(parseInt(each_entry.path.slice(0, 4))) && each_entry.type === "blob"
  )
}

export const DateMap = Object.freeze({
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
})

export function set_blog_page_default_title() {
  return page_default_title + " | Blog"
}

export function default_filter() {
  const date = new Date()
  // @ts-ignore
  const month = DateMap[date.getMonth()]

  return `${date.getFullYear()}/${month}`
}

export async function fetch_blog_tree() {
  /** @type {Response} */
  let response

  try {
    response = await fetch(
      `${cloud_host_blog_tree_endpoint}?${new URLSearchParams({
        recursive: "true",
      })}`
    )
  } catch (err) {
    console.error(err)
    return []
  }

  /** @type {Payload} */
  let body
  try {
    body = await response.json()
  } catch (err) {
    console.error(err)
    return []
  }

  if (!Array.isArray(body.tree)) return []

  return body.tree.filter(is_valid_article)
}

/**
 * Fetch blog articles from the cloud host
 *
 * A filter can narrow results to a single year, a single month, or a single day
 * and should return them in a form of `${year}/${month}/${day}, omitting
 * whichever parameters are not needed
 *
 * To return articles for a time range, call this function appropriately over
 * the necessary range
 *
 * @param {Tree} tree
 * @param {() => string} filter
 *
 * @returns {AsyncGenerator<Article>}
 */
export async function* fetch_blog_article_content(tree, filter) {
  const articles = tree.filter((each_tree) => {
    return each_tree.path.indexOf(filter()) >= 0
  })

  for (const each_article of articles) {
    /** @type {ArticleDateArray} */
    // @ts-ignore
    const date_array = each_article.path.split("/")
    date_array.pop()

    const file_name = each_article.path.split("/").pop() || each_article.path

    const accept_header = each_article.path.endsWith(".md")
      ? "application/vnd.github.VERSION.html"
      : "application/vnd.github.VERSION.raw"

    let article_api_response
    try {
      article_api_response = await fetch(
        cloud_host_blog_content_endpoint + each_article.path,
        {
          headers: new Headers({ accept: accept_header }),
        }
      )
    } catch (error) {}

    const content = (await article_api_response?.text()) || ""
    const sanitized_content = content.replaceAll(/ id="user-content-/g, ' id="')

    yield {
      date: date_array,
      file_name: file_name,
      content: sanitized_content,
    }
  }
  return
}
