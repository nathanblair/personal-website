<script>
	import { page } from '$app/stores'
	import BlogPlaceholder from '$lib/components/BlogPlaceholder.svelte'
</script>

<svelte:head>
	{#await $page.data.blog_fetch then blog}
		<title>{blog.title}</title>
		<meta name="description" content={$page.data.description} />
		{@html `<script type="application/ld+json">${JSON.stringify(blog.structured_data)}</script>`}
	{:catch error}
		<p>{error}</p>
	{/await}
</svelte:head>

{#await $page.data.blog_fetch}
	<p>Fetching blog...</p>
	<BlogPlaceholder />
{:then blog}
	<header class="text-center sm:mx-44 sm:my-4">
		<h1 class="mb-2 text-2xl">{blog.title}</h1>
		<h2 class="text-xl text-surface-500">{blog.date}</h2>
	</header>

	<div
		class="mx-8 mb-8 mt-2 overflow-x-scroll text-surface-900-100 sm:mx-36 sm:mt-10"
	>
		{@html blog.content}
	</div>
{:catch error}
	<p>{error}</p>
{/await}
