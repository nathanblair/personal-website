/** @type {Cache} */
let cache

/**
 *
 * @param {Cache} c
 */
export async function init(c) {
  if (!cache) cache = c
  return true
}

/**
 *
 * @param {URL} url
 */
export async function retrieve(url) {
  console.log(`Checking cache for '${url}'...`)
  const cached = await cache.match(url)

  if (cached === undefined) {
    console.log(`Cache not found for '${url}'`)
    return cached
  }

  console.log(`Cache hit for '${url}'`)
  return cached
}

/**
 *
 * @param {URL} url
 * @param {any} body
 * @param {number} status
 * @param {object} headers
 * @param {any} context
 * @returns {Promise<Response>}
 */
export async function store(url, body, status, headers, context) {
  /** @type {HeadersInit} */
  const h = []
  for (let [key, value] of Object.entries(headers)) {
    if (value === undefined || value === null) continue
    if (key === 'cache-control') value = 'public, max-age=3600'
    h.push([key, value.toString()])
  }

  const cached = new Response(body, { status: status, headers: new Headers(h) })

  console.log(`Caching response to '${url}'...`)
  context.waitUntil(cache.put(url, cached.clone()))

  return cached
}
