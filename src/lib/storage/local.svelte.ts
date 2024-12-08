import { browser } from '$app/environment'

export class LocalStore<T> {
	value: T = $state({} as T)
	#key = ''

	constructor(key: string, value: T) {
		this.#key = key
		this.value = value ?? ({} as T)

		if (browser) {
			const item = localStorage.getItem(key)
			if (item) this.value = this.deserialize(item)
		}

		$effect(() => {
			localStorage.setItem(this.#key, this.serialize(this.value))
		})
	}

	/**
	 * @param {T} value
	 * @returns {string}
	 */
	serialize(value: T): string {
		return JSON.stringify(value)
	}

	/**
	 * @param {string} item
	 * @returns {T}
	 */
	deserialize(item: string): T {
		return JSON.parse(item)
	}
}

/**
 * @template T
 * @param {string} key
 * @param {T} value
 */
export function localStore<T>(key: string, value: T) {
	return new LocalStore(key, value)
}
