<script>
	import { page } from '$app/stores'

	import AppBar from '$lib/components/AppBar.svelte'
	import Footer from '$lib/components/Footer.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	<meta name="description" content={$page.data.description} />
	{#if $page.data.structured_data}
		{@html `<script type="application/ld+json">${JSON.stringify($page.data.structured_data)}</script>`}
	{/if}
</svelte:head>

<AppBar></AppBar>

<main
	class="flex flex-1 flex-col justify-center dark:bg-surface-contrast-100 dark:text-surface-contrast-900"
>
	{@render children()}
</main>

<Footer></Footer>

<style>
	@import '$lib/styles/global.css';
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
</style>
