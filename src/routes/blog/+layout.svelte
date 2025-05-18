<script lang="ts">
	import { page } from '$app/state'
	import BlogList from '$lib/components/BlogList.svelte'
	import { getLocaleContext } from '$lib/datetime.js'

	let { data, children } = $props()

	const { locale, timeZone } = getLocaleContext()

	let blogs = $derived(data.blogs.blogSlugs)
</script>

<div class="relative flex flex-1 flex-col space-y-4 pt-3">
	<!-- FIXME -->
	<!-- On this page, show the years blogs were written in -->
	<!-- And eventually, show the n most recent blogs as well -->

	<!-- FIXME -->
	<!-- This is broken -->
	<!-- We don't get to the 'else' clause here to render the blog 'children' -->
	<!-- element like we should when we're directly visiting the blog page URL -->
	{#if page.params.slug || page.route.id === '/blog'}
		{#each data.blogScope as scope}
			<a href="/blog/{scope}" class="btn">{scope}</a>
		{/each}

		<div
			class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			<BlogList blogSlugs={blogs} {locale} {timeZone} />
		</div>
	{:else}
		{@render children()}
	{/if}
</div>
