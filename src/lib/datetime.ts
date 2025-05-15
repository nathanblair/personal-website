export const locale = Intl.DateTimeFormat().resolvedOptions().locale
export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function formatLocaleDateTime(locale: string, timeZone: string) {
	return new Date().toLocaleString(locale, {
		timeZone: timeZone,
	})
}

export function formatBlogDateTime(date: string) {
	return new Date(date).toLocaleString(locale, {
		year: 'numeric',
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		month: 'long',
		weekday: 'long',
		day: 'numeric',
		timeZoneName: 'short',
	})
}
