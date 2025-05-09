<script>
	import { page } from '$app/state'

	import '../app.css'

	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'

	let { children, data } = $props()
</script>

<svelte:head>
	<title>{page.data.title}</title>
	<meta name="description" content={page.data.description} />
	{#if page.data.structured_data}
		{@html `<script type="application/ld+json">${JSON.stringify(page.data.structured_data)}</script>`}
	{/if}
</svelte:head>

<Header session={data.session}></Header>

<main
	class="text-surface-950-50 dark:bg-surface-contrast-100 flex flex-1 flex-col"
>
	{@render children()}
</main>

<Footer></Footer>
