import { CacheStorage, KVNamespace } from "@cloudflare/workers-types"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Platform_Env {
			github_blog_app: KVNamespace
			GITHUB_APP_SECRET: string
			GITHUB_APP_CLIENT_ID: string
			GITHUB_APP_INSTALL_ID: string
		}
		interface Platform {
			caches: CacheStorage
			context: any
			env: Platform_Env
		}
	}
}

export { }

