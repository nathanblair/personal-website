import { CacheStorage, KVNamespace, R2Bucket } from "@cloudflare/workers-types"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Platform_Env {
			config: KVNamespace
			blogs: R2Bucket
			GITHUB_APP_CLIENT_ID: string
			GITHUB_APP_CLIENT_SECRET: string
			GITHUB_APP_INSTALL_ID: string
			GITHUB_APP_SECRET: string
		}
		interface Platform {
			caches: CacheStorage
			context: any
			env: Platform_Env
		}
	}
}

export { }

