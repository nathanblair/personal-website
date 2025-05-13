<script lang="ts">
	import { enhance } from '$app/forms'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

{#await data.commentsInitialized then initialized}
	<form use:enhance method="POST">
		<button
			class="btn preset-tonal my-2 w-full lg:w-auto"
			formaction="/comment?/{initialized ? 'drop' : 'create'}"
		>
			{initialized ? 'Remove Comments Table' : 'Initialize Comments'}</button
		>
	</form>
{/await}

{#await data.rocksInitialized then initialized}
	<form use:enhance method="POST">
		<button
			class="btn preset-tonal my-2 w-full lg:w-auto"
			formaction="/rock?/{initialized ? 'drop' : 'create'}"
			>{initialized ? 'Remove Rocks Table' : 'Initialize Rocks'}</button
		>
	</form>
{/await}
