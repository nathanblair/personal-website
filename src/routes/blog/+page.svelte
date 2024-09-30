<script>
	import { page } from '$app/stores'
</script>

{#await $page.data.blogs_fetch}
	<p>Fetching blogs...</p>
{:then blogs}
	{#each blogs as blog}
		<a class="" href={blog.url}>{blog.date} - {blog.title}</a>
	{/each}
{:catch error}
	<p>{error}</p>
{/await}
