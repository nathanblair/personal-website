const options = Intl.DateTimeFormat().resolvedOptions()
export const locale = options.locale
export const timeZone = options.timeZone

export function formatStorageDateTime() {
	const iso = new Date().toISOString()
	return iso
}

export function formatDisplayTime(
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
