export async function retrieve(cache: Cache, url: URL) {
	console.log(`Checking cache for '${url}'...`)
	const cached = await cache.match(url)

	if (cached === undefined) {
		console.log(`Cache not found for '${url}'`)
	} else {
		console.log(`Cache hit for '${url}'`)
	}

	return cached
}

export async function store(
	cache: Cache,
	url: URL,
	body: any,
	status: number,
	headers: object,
	context: any,
): Promise<Response> {
	const h: HeadersInit = []
	for (let [key, value] of Object.entries(headers)) {
		if (value === undefined || value === null) continue
		if (key === 'cache-control') value = 'public, max-age=3600'
		h.push([key, value.toString()])
	}

	const cached = new Response(body, { status: status, headers: new Headers(h) })
	const cloned: Response = cached.clone()

	console.log(`Caching response to '${url}'...`)
	context.waitUntil(cache.put(url, cloned))

	return cached
}
