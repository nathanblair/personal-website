import { StructuredData } from "./_.js"

export class Person {
  /**
   * @param {string} name
   * @param {string} description
   * @param {string} url
   */
  constructor(name, description, url) {
    this._ = new StructuredData("Person")
    this.name = name
    this.description = description
    this.url = url
  }

  get structured_data() {
    return {
      // "@context": this._.context,
      "@type": this._.type,
      "name": this.name,
      "description": this.description,
      "url": this.url
    }
  }
}

export const my_person = new Person("Nathan Blair", "Jack of all trades. Master of Some.", "https://nathanblair.rocks/about")
