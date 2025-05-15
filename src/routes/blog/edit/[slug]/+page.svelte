<script lang="ts">
	import { locale, timeZone } from '$lib/datetime.js'

	let { data } = $props()
</script>

{#await data.blogFetch then blog}
	<input type="hidden" name="locale" value={locale} />
	<input type="hidden" name="timeZone" value={timeZone} />
{:catch error}
	<p>{error}</p>
{/await}
