import { Session } from '$lib/types/auth'

import {
	CacheStorage,
	D1Database,
	KVNamespace,
	R2Bucket,
} from '@cloudflare/workers-types'

interface PlatformEnv {
	config: KVNamespace
	blogs: R2Bucket
	db: D1Database
	GITHUB_APP_CLIENT_ID: string
	GITHUB_APP_CLIENT_SECRET: string
	GITHUB_APP_SECRET: string
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			db: D1Database
			blogs: R2Bucket
			prefixes: string[]
		}

		interface Platform {
			caches: CacheStorage
			context: any
			env: PlatformEnv
		}

		interface PageState {
			previousCursor?: string
		}

		interface PageData {
			session: Session | null
		}
	}
}
