<script lang="ts">
	import { page } from '$app/state'
	import BlogList from '$lib/components/BlogList.svelte'
	import Breadcrumb from '$lib/components/Breadcrumb.svelte'
	import { getLocaleContext } from '$lib/datetime.js'

	let { data, children } = $props()

	const { locale, timeZone } = getLocaleContext()

	const blogs = $derived(data.blogs.blogSlugs)
</script>

<div class="relative flex flex-1 flex-col space-y-4 pt-3">
	<!-- FIXME -->
	<!-- And eventually, show the n most recent blogs as well -->

	{#if page.route.id !== '/blog/[...slug]'}
		{#each data.blogScopes as scopes}
			<Breadcrumb parts={scopes} root="/blog" />
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
