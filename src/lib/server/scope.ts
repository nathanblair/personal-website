import type { AnchorProps } from '$lib/types/components.ts'
import type { LayoutParams } from '../../routes/blog/$types'

export class Scope {
	year?: string
	month?: string
	day?: string
	slug?: string

	constructor(params: LayoutParams) {
		const { year, month, day, slug } = params
		this.year = year
		this.month = month
		this.day = day
		this.slug = slug
	}

	toString(): string {
		let str = this.year ?? ''
		if (this.month) str += `/${this.month}`
		if (this.day) str += `/${this.day}`

		return str
	}

	toAnchorProps(): AnchorProps[] {
		const anchorProps: AnchorProps[] = []

		if (this.year)
			anchorProps.push({ href: `/blog/${this.year}`, label: this.year })

		if (this.month)
			anchorProps.push({
				href: `/blog/${this.year}/${this.month}`,
				label:
					this.year && this.month
						? new Date(
								parseInt(this.year, 10),
								parseInt(this.month, 10) - 1,
							).toLocaleString('default', {
								month: 'long',
							})
						: this.month,
			})

		if (this.day)
			anchorProps.push({
				href: `/blog/${this.year}/${this.month}/${this.day}`,
				label: this.day,
			})

		return anchorProps
	}
}
