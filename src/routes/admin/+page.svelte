<script lang="ts">
	import { enhance } from '$app/forms'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<form use:enhance method="POST" class="flex space-x-2 pt-4">
	{#await data.commentsInitialized then initialized}
		<button
			class="flex-1 border p-2"
			formaction="/comment?/{initialized ? 'drop' : 'create'}"
		>
			{initialized ? 'Remove Comments Table' : 'Initialize Comments'}</button
		>
	{/await}

	{#await data.rocksInitialized then initialized}
		<button
			class="flex-1 border p-2"
			formaction="/rock?/{initialized ? 'drop' : 'create'}"
			>{initialized ? 'Remove Rocks Table' : 'Initialize Rocks'}</button
		>
	{/await}
</form>
