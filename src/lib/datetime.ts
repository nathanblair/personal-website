const options = Intl.DateTimeFormat().resolvedOptions()
export const locale = options.locale
export const timeZone = options.timeZone

function getFromParts(
	parts: Intl.DateTimeFormatPart[],
	type: Intl.DateTimeFormatPartTypes,
) {
	return parts.find((p) => p.type === type)?.value ?? ''
}

export function formatStorageDateTime() {
	const iso = new Date().toISOString()
	return iso
}

export function formatInputDateTime(
	dateTime: string,
	locale: string,
	timeZone: string,
) {
	const d = new Date(dateTime)
	const formatter = new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone,
	})
	const parts = formatter.formatToParts(d)

	const datePart = [
		getFromParts(parts, 'year'),
		getFromParts(parts, 'month'),
		getFromParts(parts, 'day'),
	]
	const timePart = [getFromParts(parts, 'hour'), getFromParts(parts, 'minute')]
	return `${datePart.join('-')}T${timePart.join(':')}`
}

export function formatDisplayDateTime(
	date: string,
	locale: string,
	timeZone: string,
) {
	return new Date(date).toLocaleString(locale, {
		year: 'numeric',
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		month: 'long',
		weekday: 'long',
		day: 'numeric',
		timeZoneName: 'short',
		timeZone,
	})
}
