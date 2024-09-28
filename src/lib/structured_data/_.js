export class StructuredData {
  context = "https://schema.org"
  type

  /**
   * @param {string} type
   */
  constructor(type) {
    this.type = type
  }
}
