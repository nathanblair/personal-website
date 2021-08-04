const cloud_host_endpoint = "https://api.github.com"
const blog_path = "/repos/nathanblair/blog/contents/"
const cloud_host_blog_list_endpoint = `${cloud_host_endpoint}${blog_path}`

/**
 * @typedef {Array<{
 *  name: string,
 *  path: string,
 *  type: "file" | "dir" | "symlink" | "submodule",
 *  download_url: string
 * }>} Payload
 */

/** @typedef {[string, string, string]} ArticleDateArray */

/**
 * @typedef {{
 *  file_name: string,
 *  date: ArticleDateArray,
 *  content: string
 * }} Article
 */

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

export function default_filter() {
  const date = new Date()
  // @ts-ignore
  const month = DateMap[date.getMonth()]

  return `${date.getFullYear()}/${month}`
}

/** @param {string} url */
async function download_blog_article(url) {
  return (await fetch(url)).text()
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
 * @returns {AsyncIterable<Article>}
 */
export async function* fetch_blog_articles(filter) {
  /** @type {Response} */
  let response

  try {
    response = await fetch(`${cloud_host_blog_list_endpoint}${filter()}`)
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
    switch (each_entry.type) {
      case "dir":
        yield* fetch_blog_articles(() => each_entry.path)
        continue
      case "file":
        const date_array = each_entry.path.split("/")
        date_array.pop()
        /** @type {Article} */
        let article
        try {
          article = {
            file_name: each_entry.name,
            // @ts-ignore
            date: date_array,
            content: await download_blog_article(each_entry.download_url),
          }
          yield article
        } catch (err) {
          console.error(err)
          continue
        }
        break
    }
  }
  return
}
