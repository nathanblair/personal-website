import { SD } from './_'

export type PersonSD = {
	// '@context': string
	'@type': string
	name: string
	description: string
	url: string
}

export class Person {
	_: SD
	name: string
	description: string
	url: string

	constructor(name: string, description: string, url: string) {
		this._ = new SD('Person')
		this.name = name
		this.description = description
		this.url = url
	}

	get structured_data(): PersonSD {
		return {
			// "@context": this._.context,
			'@type': this._.type,
			name: this.name,
			description: this.description,
			url: this.url,
		}
	}
}

export const me = new Person(
	'Nathan Blair',
	'Jack of all trades. Master of Some.',
	'https://nathanblair.rocks/about',
)
