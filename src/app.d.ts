import { KVNamespace } from "@cloudflare/workers-types"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Platform_Env {
			github_blog_app: KVNamespace
			GITHUB_APP_SECRET: string
		}
		interface Platform {
			caches: { default: object }
			env: Platform_Env
		}
	}
}

export { }

