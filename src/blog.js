import { page_default_title } from "./constants.js"

export const total_days = 31
export const blog_placeholder_class_name = "blog-placeholder"

const cloud_host_endpoint = "https://api.github.com"
const blog_path = "/repos/nathanblair/blog/contents/"
const cloud_host_blog_list_endpoint = `${cloud_host_endpoint}${blog_path}`

/**
 * @typedef {Array<{
 *  body: string,
 *  body_text: string,
 *  body_html: string,
 *  name: string,
 *  path: string,
 *  type: "file" | "dir" | "symlink" | "submodule",
 *  download_url: string
 * }>} Payload
 */

/** @typedef {[string, string, string]} ArticleDateArray */

/** @typedef {{file_name: string, date: ArticleDateArray, content: string}} Article */

/** @typedef {Map<number, Article>} Articles */

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
  // FIXME Replace all this with just calling the GitHub get trees API
  // So that we can get all the files in the repository
  // Then we'll just filter through the file paths locally, and populate a list
  // of articles locally.

  // Then for each article in the local articles array, we'll call the get contents
  // API for that article, making sure to pass in the appropriate header for
  // whether the file is a markdown or html file

  /** @type {Response} */
  let response

  try {
    response = await fetch(`${cloud_host_blog_list_endpoint}${filter()}`, {
      headers: new Headers({
        accept: "application/vnd.github.VERSION.full+json",
      }),
    })
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

  if (!Array.isArray(body)) {
    return
  }

  for (const each_entry of body) {
    switch (each_entry.body.type) {
      case "dir":
        yield* fetch_blog_articles(() => each_entry.path)
        continue
      case "file":
        const date_array = each_entry.path.split("/")
        date_array.pop()
        try {
          yield {
            file_name: each_entry.name,
            // @ts-ignore
            date: date_array,
            content:
              each_entry.path.split(".").pop() === "md"
                ? each_entry.body_html
                : each_entry.body_text,
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
        break
    }
  }
  return
}
