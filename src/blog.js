import { page_default_title } from "./constants.js"

export const total_days = 31
export const blog_placeholder_class_name = "blog-placeholder"

const cloud_host_endpoint = "https://api.github.com"
const tree_path = "/repos/nathanblair/blog/git/trees/default/"
const cloud_host_blog_tree_endpoint = `${cloud_host_endpoint}${tree_path}`

/**
 * @typedef {{
 * path: string,
 * mode: string,
 * type: "tree" | "blob",
 * sha: string,
 * url: string,
 * }} Tree
 */

/**
 * @typedef {{
 *  sha: string,
 *  url: string,
 *  tree: Array<Tree>,
 * }} Payload
 */

/** @typedef {[string, string, string]} ArticleDateArray */

/** @typedef {{file_name: string, date: ArticleDateArray, content: string}} Article */

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
 * @param {() => string} filter
 *
 * @returns {AsyncGenerator<Article>}
 */
export async function* fetch_blog_articles(filter) {
  /** @type {Response} */
  let response

  try {
    response = await fetch(`${cloud_host_blog_tree_endpoint}`)
  } catch (err) {
    console.error(err)
    return
  }

  /** @type {Payload} */
  let body
  try {
    body = await response.json()
  } catch (err) {
    console.error(err)
    return
  }

  if (!Array.isArray(body.tree)) {
    return
  }

  const articles = body.tree.filter((each_tree) => {
    each_tree.path.indexOf(filter()) >= 0 && each_tree.type === "blob"
  })

  for (const each_article of articles) {
    const date_array = each_article.path.split("/")
    date_array.pop()
    try {
      yield {
        file_name: each_article.name,
        // @ts-ignore
        date: date_array,
        content:
          each_article.path.split(".").pop() === "md"
            ? each_article.body_html
            : each_article.body_text,
        // content: await (
        //   await fetch(cloud_host_blog_list_endpoint + each_entry.path, {
        //     headers: new Headers({
        //       accept: `application/vnd.github.VERSION.${
        //         each_entry.path.split(".").pop() === "md" ? "html" : "raw"
        //       }`,
        //     }),
        //   })
        // ).text(),
      }
    } catch (err) {
      console.error(err)
      continue
    }
  }
  return
}
