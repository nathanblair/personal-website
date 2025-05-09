import { StructuredData } from './_'

export type PersonStructuredData = {
	// '@context': string
	'@type': string
	name: string
	description: string
	url: string
}

export class Person {
	_: StructuredData
	name: string
	description: string
	url: string

	constructor(name: string, description: string, url: string) {
		this._ = new StructuredData('Person')
		this.name = name
		this.description = description
		this.url = url
	}

	get structured_data(): PersonStructuredData {
		return {
			// "@context": this._.context,
			'@type': this._.type,
			name: this.name,
			description: this.description,
			url: this.url,
		}
	}
}

export const my_person = new Person(
	'Nathan Blair',
	'Jack of all trades. Master of Some.',
	'https://nathanblair.rocks/about',
)
