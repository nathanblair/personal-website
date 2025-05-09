import { StructuredData } from './_'
import type { Person, PersonStructuredData } from './person'

export type BlogPostStructuredData = {
	'@context': string
	'@type': string
	author: PersonStructuredData
	datePublished: string
	headline: string
}

export class BlogPosting {
	_: StructuredData
	date_published: Date
	headline: string
	author: Person

	constructor(datePublished: Date, headline: string, author: Person) {
		this._ = new StructuredData('BlogPosting')
		this.date_published = datePublished
		this.headline = headline
		this.author = author
	}

	get structured_data(): BlogPostStructuredData {
		return {
			'@context': this._.context,
			'@type': this._.type,
			author: this.author.structured_data,
			datePublished: this.date_published.toISOString(),
			headline: this.headline,
		}
	}
}
