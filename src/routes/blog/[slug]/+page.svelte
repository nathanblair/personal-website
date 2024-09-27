<script>
	import { page } from '$app/stores'
	import { name } from '$lib/constants.js'

	async function get_blog() {
		return await (await fetch(`/api/blog/${$page.params.slug}`)).text()
	}
</script>

<svelte:head>
	{@html `
		<script type="application/ld+json">
			{
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				"author": {
					"@type": "Person",
					"name": "${name}",
					"url": "https://nathanblair.rocks/about"
				},
				"datePublished": "${$page.data.date}",
				"headline": "${$page.data.title}"
			}
		</script>
	`}
</svelte:head>

{#await get_blog()}
	<p>Fetching blog...</p>
{:then blog}
	{@html blog}
{:catch error}
	<p>{error}</p>
{/await}

<style>
</style>
