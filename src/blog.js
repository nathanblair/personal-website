import { page_default_title } from "./constants.js"

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

/** @typedef {{title: string, date: Array<string>, content: string}} Article */

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

/** @param {string} tree_path */
export function extract_date(tree_path) {
  return tree_path.split("/", 3).join("/")
}

/** @param {string} tree_path */
export function extract_title(tree_path) {
  return tree_path.split("/")[3].split("-").join(" ").split(".").slice(0, -1)[0]
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
 * @param {string} path
 *
 * @returns {Promise<Article>}
 */
export async function fetch_blog_article_content(path) {
  const accept_header = path.endsWith(".md")
    ? "application/vnd.github.VERSION.html"
    : "application/vnd.github.VERSION.raw"

  let article_api_response
  try {
    article_api_response = await fetch(
      `${cloud_host_blog_content_endpoint}${path}`,
      {
        headers: new Headers({ accept: accept_header }),
      }
    )
  } catch (error) { }

  const content = (await article_api_response?.text()) || ""
  const sanitized_content = content.replaceAll(/ id="user-content-/g, ' id="')

  return {
    date: path.split("/").slice(0, 2),
    title: path.split("/").pop()?.split("-").slice(3).join(" ") || path,
    content: sanitized_content,
  }
}
