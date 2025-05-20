import type { AnchorProps } from '$lib/types/components.ts'
import type { LayoutParams } from '../../routes/blog/$types'
import { Scope } from './scope.ts'

export class Prefix extends Scope {
	constructor(params: LayoutParams) {
		super(params)
	}

	static fromPath(path: string): Prefix {
		const parts = path.split('/').filter(Boolean)
		const year = parts[0] ?? undefined
		const month = parts[1] ?? undefined
		const day = parts[2] ?? undefined
		const slug = parts[3] ?? undefined

		return new Prefix({ year, month, day, slug })
	}

	toString(): string {
		let str = this.year ? `${this.year}/` : ''
		if (this.month) str += `${this.month}/`
		if (this.day) str += `${this.day}/`
		if (this.slug) str += `${this.slug}/`

		return str
	}

	toAnchorProp(): AnchorProps | undefined {
		if (this.day)
			return {
				href: `/blog/${this.year}/${this.month}/${this.day}`,
				label: this.day,
			}

		if (this.month)
			return {
				href: `/blog/${this.year}/${this.month}`,
				label: new Date(
					// @ts-ignore
					parseInt(this.year, 10),
					parseInt(this.month, 10) - 1,
				).toLocaleString('default', {
					month: 'long',
				}),
			}

		if (this.year)
			return {
				href: `/blog/${this.year}`,
				label: this.year,
			}

		return
	}
}
