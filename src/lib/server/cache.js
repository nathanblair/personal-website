/**
 * @param {Cache} cache
 * @param {URL} url
 */
export async function retrieve(cache, url) {
  console.log(`Checking cache for '${url}'...`)
  const cached = await cache.match(url)

  if (cached === undefined) {
    console.log(`Cache not found for '${url}'`)
  } else {
    console.log(`Cache hit for '${url}'`)
  }

  return cached
}

/**
 * @param {Cache} cache
 * @param {URL} url
 * @param {any} body
 * @param {number} status
 * @param {object} headers
 * @param {any} context
 * @returns {Promise<Response>}
 */
export async function store(cache, url, body, status, headers, context) {
  /** @type {HeadersInit} */
  const h = []
  for (let [key, value] of Object.entries(headers)) {
    if (value === undefined || value === null) continue
    if (key === 'cache-control') value = 'public, max-age=3600'
    h.push([key, value.toString()])
  }

  const cached = new Response(body, { status: status, headers: new Headers(h) })
  /** @type {Response} */
  const cloned = cached.clone()

  console.log(`Caching response to '${url}'...`)
  context.waitUntil(cache.put(url, cloned))

  return cached
}
