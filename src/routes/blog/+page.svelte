<script>
	/** @returns {Promise<import('$lib/blog.js').Blog[]>}*/
	async function list_blogs() {
		const blog_response = await fetch('/api/blog')
		const blogs = await blog_response.json()
		return blogs
	}
</script>

{#await list_blogs()}
	<p>Fetching blogs...</p>
{:then blogs}
	{#each blogs as blog}
		<a class="" href={blog.url}>{blog.date} - {blog.title}</a>
	{/each}
{:catch error}
	<p>{error}</p>
{/await}
