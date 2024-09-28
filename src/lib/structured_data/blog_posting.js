import { StructuredData } from './_.js'

export class BlogPosting {
  /**
   * @param {Date} datePublished
   * @param {string} headline
   * @param {import('./person.js').Person} author
   */
  constructor(datePublished, headline, author) {
    this._ = new StructuredData("BlogPosting")
    /** @type {Date} */
    this.date_published = datePublished
    /** @type {string} */
    this.headline = headline
    /** @type {import('./person.js').Person} */
    this.author = author
  }

  get structured_data() {
    return {
      "@context": this._.context,
      "@type": this._.type,
      "author": this.author.structured_data,
      "datePublished": this.date_published.toISOString(),
      "headline": this.headline
    }
  }
}
