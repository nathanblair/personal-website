import { SD } from './_'
import { me, Person } from './person'

export class ProfilePage {
	_: SD
	private mainEntity: Person

	constructor(person: Person) {
		this._ = new SD('ProfilePage')
		this.mainEntity = person
	}

	get structured_data() {
		return {
			'@context': this._.context,
			'@type': this._.type,
			mainEntity: this.mainEntity.structured_data,
		}
	}
}

export const myProfile = new ProfilePage(me)
