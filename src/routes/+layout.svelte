<script>
	import { page } from '$app/stores'

	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import { name } from '$lib/constants.js'

	let { children } = $props()
</script>

<Header />

<svelte:head>
	<meta name="description" content={$page.data.description} />
	<title>{name} | {$page.data.title}</title>
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
	}
</style>
