<script>
	import { page } from '$app/stores'
</script>

<svelte:head>
	{#await $page.data.blog_fetch}
		<title>Fetching Blog</title>
		<meta name="description" content="Blog not yet fetched" />
	{:then blog}
		<title>{blog.title}</title>
		<meta name="description" content={$page.data.description} />
		{@html `<script type="application/ld+json">${JSON.stringify(blog.structured_data)}</script>`}
	{:catch error}
		<p>{error}</p>
	{/await}
</svelte:head>

{#await $page.data.blog_fetch}
	<p>Fetching blog...</p>
{:then blog}
	{@html blog.content}
{:catch error}
	<p>{error}</p>
{/await}
