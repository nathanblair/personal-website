<script lang="ts">
	import { page } from '$app/state'
	import BlogList from '$lib/components/BlogList.svelte'
	import Breadcrumb from '$lib/components/Breadcrumb.svelte'
	import { getLocaleContext } from '$lib/datetime.js'

	let { data, children } = $props()

	const { locale, timeZone } = getLocaleContext()

	const prefixesAtScope = $derived(data.prefixesAtScope)
	const crumbs = $derived(data.crumbs)
	const slugs = $derived(data.slugs)
	const isBlogPage = $derived(
		page.route.id === '/blog/[...slug]' ||
			page.route.id === '/blog/create' ||
			page.route.id === '/blog/edit/[...slug]',
	)
</script>

<div class="flex flex-1 flex-col space-y-4 pt-3">
	<Breadcrumb {crumbs} root="/blog" />

	{#if isBlogPage}
		<div class="relative">
			{@render children()}
		</div>
	{:else}
		{#each prefixesAtScope as scopePrefix}
			{#if scopePrefix}
				<a href={scopePrefix.href} class="btn hover:underline">
					{scopePrefix.label}
				</a>
			{/if}
		{/each}

		<div
			class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			<BlogList blogSlugs={slugs} {locale} {timeZone} />
		</div>
	{/if}
</div>
