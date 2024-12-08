import { StructuredData } from './_'

export class BlogPosting {
	_: StructuredData
	date_published: Date
	headline: string
	author: import("./person").Person

	constructor(datePublished: Date, headline: string, author: import('./person').Person) {
		this._ = new StructuredData('BlogPosting')
		this.date_published = datePublished
		this.headline = headline
		this.author = author
	}

	get structured_data() {
		return {
			'@context': this._.context,
			'@type': this._.type,
			author: this.author.structured_data,
			datePublished: this.date_published.toISOString(),
			headline: this.headline,
		}
	}
}
