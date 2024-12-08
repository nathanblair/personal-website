import { StructuredData } from './_'
import { my_person, Person } from './person'

export class ProfilePage {
	_: StructuredData
	private main_entity: Person

	constructor(person: Person) {
		this._ = new StructuredData('ProfilePage')
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
