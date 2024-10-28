/** @typedef {{title: string, url: string, date: string,}} Blog */

/**
 * @param {string} document_name
 *
 * @returns {[Date, string, string]}
 */
export function parse(document_name) {
	const blog_parse = document_name.split(';')
	const blog_date = new Date(blog_parse[0])
	const blog_title = blog_parse[1].split('.').slice(0, -1).join('')
	const blog_format = blog_parse[1].split('.').pop() || ''

	return [blog_date, blog_title, blog_format]
}
