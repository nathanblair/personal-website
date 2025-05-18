import type { R2Bucket } from '@cloudflare/workers-types/2023-07-01'

export function remove(bucket: R2Bucket, key: string) {
	console.log('Removing', key)
	return bucket.delete(key)
}
