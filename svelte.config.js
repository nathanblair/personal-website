import adapter from '@sveltejs/adapter-cloudflare'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			routes: {
				include: ['/api'],
				exclude: ['<all>']
			},
			platformProxy: {
				configPath: 'wrangler.toml',
				persist: false
			}
		})
	}
}

export default config
