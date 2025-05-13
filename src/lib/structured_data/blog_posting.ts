import { SD } from './_'
import type { Person, PersonSD } from './person'

export type BlogPostSD = {
	'@context': string
	'@type': string
	author: PersonSD
	datePublished: string
	headline: string
}

export class BlogPostingSD {
	_: SD
	datePublished: Date
	headline: string
	author: Person

	constructor(datePublished: Date, headline: string, author: Person) {
		this._ = new SD('BlogPosting')
		this.datePublished = datePublished
		this.headline = headline
		this.author = author
	}

	get structured_data(): BlogPostSD {
		return {
			'@context': this._.context,
			'@type': this._.type,
			author: this.author.structured_data,
			datePublished: this.datePublished.toISOString(),
			headline: this.headline,
		}
	}
}
