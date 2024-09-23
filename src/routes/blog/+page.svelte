<script>
	async function list_blogs() {
		return await (await fetch('/api/blog')).json()
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

<style>
</style>
