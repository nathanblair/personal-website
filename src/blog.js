const github_content_list_endpoint = "https://api.github.com"
const blog_path = "/repos/nathanblair/blog/contents/"

/** @typedef {Array<{name: string, path: string, download_url: string}>} GitHubPayload */
/** @typedef {Array<{title: string, date: string, snippet: string, article: string}>} Blog */

/** @param {string} url */
export async function download_blog_article(url) {
  return (await fetch(url)).text()
}

/** Fetch blog articles from the cloud host */
async function fetch_blog_articles() {
  /** @type {Response} */
  let response

  try {
    response = await fetch(`${github_content_list_endpoint}${blog_path}`)
  } catch (err) {
    console.error(err)
    return []
  }

  /** @type {GitHubPayload} */
  let body
  try {
    body = await response.json()
  } catch (err) {
    console.error(err)
    return []
  }

  /** @type {GitHubPayload} */
  const articles = []

  for (const each_entry of body) {
    switch (each_entry.name) {
      case "old":
      case ".gitignore":
        break

      default:
        try {
          articles.push(each_entry)
        } catch (err) {
          console.error(err)
          continue
        }
        break
    }
  }

  return articles
}

export async function parse_blog_articles() {
  // TODO extract the blog title, date, and generate an excerpt
  const article_payload = await fetch_blog_articles()
  /** @type {Blog} */
  const articles = []

  const parser = new DOMParser()

  for (const each_article_payload of article_payload) {
    const article_html = await download_blog_article(
      each_article_payload.download_url
    )

    const article_element = parser.parseFromString(article_html, "text/html")

    articles.push({
      title:
        article_element.querySelector("article > header > h1")?.innerHTML || "",
      date:
        article_element.querySelector("article > header > h2")?.innerHTML || "",
      snippet: article_element.querySelector("article > p")?.innerHTML || "",
      article: article_html,
    })
  }

  return articles
}
