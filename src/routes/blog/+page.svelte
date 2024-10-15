<script>
	import { page } from '$app/stores'
	import BlogPlaceholder from '$lib/components/BlogPlaceholder.svelte'
</script>

{#await $page.data.blogs_fetch}
	<p>Fetching blogs...</p>
	<BlogPlaceholder />
{:then blogs}
	{#each blogs as blog}
		<a class="" href={blog.url}>{blog.date} - {blog.title}</a>
	{/each}
{:catch error}
	<p>{error}</p>
{/await}
