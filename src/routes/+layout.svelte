<script>
	import { page } from '$app/stores'

	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'

	let { children } = $props()
</script>

<Header />

<svelte:head>
	<title>{$page.data.title}</title>
	<meta name="description" content={$page.data.description} />
	{#if $page.data.structured_data}
		{@html `<script type="application/ld+json">${JSON.stringify($page.data.structured_data)}</script>`}
	{/if}
</svelte:head>

<main>
	{@render children()}
</main>

<Footer />

<style>
	@import '$lib/styles/global.css';
	@import '$lib/styles/helpers.css';
	@import '$lib/styles/material-symbols.css';
	@import '$lib/styles/theme.css';

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
