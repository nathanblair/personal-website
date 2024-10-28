import { StructuredData } from './_.js'
import { my_person, Person } from './person.js'

export class ProfilePage {
	/**
	 * @param {Person} person
	 */
	constructor(person) {
		this._ = new StructuredData('ProfilePage')
		/** @private @type {Person} */
		this.main_entity = person
	}

	get structured_data() {
		return {
			'@context': this._.context,
			'@type': this._.type,
			mainEntity: this.main_entity.structured_data,
		}
	}
}

export const my_profile = new ProfilePage(my_person)
