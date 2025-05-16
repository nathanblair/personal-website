<script lang="ts">
	import BlogList from '$lib/components/BlogList.svelte'
	import { getLocaleContext } from '$lib/datetime.js'

	let { data } = $props()

	const { locale, timeZone } = getLocaleContext()
</script>

<!--
<svelte:head>
	{#if previousCursor}
		<link rel="prev" href="/blog?cursor={previousCursor}" />
	{/if}
	{#if data.blogs.truncated}
		<link rel="next" href="/blog?cursor={data.blogs.nextCursor}" />
	{/if}
</svelte:head> -->

<!-- <div class="flex justify-evenly">
	{#if previousCursor}
		<a href="/blog?cursor={previousCursor}" class="btn">Previous Page</a>
	{/if}

	{#if data.blogs.truncated && data.blogs.nextCursor}
		<a href="/blog?cursor={data.blogs.nextCursor}" class="btn">Next Page</a>
	{/if}
</div> -->

<div
	class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
	<BlogList blogSlugs={data.blogs.blogSlugs} {locale} {timeZone} />
</div>
