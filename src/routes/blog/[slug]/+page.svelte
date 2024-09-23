<script>
	import { page } from '$app/stores'

	async function get_blog() {
		return await (await fetch(`/api/blog/${$page.params.slug}`)).text()
	}
</script>

{#await get_blog()}
	<p>Fetching blog...</p>
{:then blog}
	{@html blog}
{:catch error}
	<p>{error}</p>
{/await}

<style>
</style>
