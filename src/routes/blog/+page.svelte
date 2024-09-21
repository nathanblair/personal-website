<script>
	import { page } from '$app/stores'

	async function list_blogs() {
		/** @type {{title: string, url: string, date: Date}[]} */
		const blogs = []

		const content_request = $page.data.content_request
		if (content_request === null) {
			throw new Error('No blogs found')
		}

		/** @type {{name: string}[]}*/
		let contents
		try {
			contents = (await content_request).data
		} catch (error) {
			throw new Error('Failed to fetch blogs')
		}

		for (const each_content of contents) {
			const each_blog = each_content
			const blog_parse = each_blog.name.split(';')
			const blog_date = new Date(blog_parse[0])
			const blog_title = blog_parse[1].split('.').slice(0, -1).join('')

			blogs.push({
				title: blog_title,
				url: `/blog/${encodeURIComponent(each_blog.name)}`,
				date: blog_date
			})
		}

		return blogs
	}
</script>

{#await list_blogs()}
	<p>Fetching blogs...</p>
{:then blogs}
	{#each blogs as blog}
		<a class="" href={blog.url}>{blog.date.toDateString()} - {blog.title}</a>
	{/each}
{:catch error}
	<p>{error}</p>
{/await}

<style>
</style>
