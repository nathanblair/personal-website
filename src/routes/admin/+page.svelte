<script lang="ts">
	import { enhance } from '$app/forms'

	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<form use:enhance method="POST" class="flex space-x-2 pt-4">
	<a
		class="btn flex items-center justify-center"
		href="/blog/create"
		aria-label="create"
		title="Create a new blog post">Create Post</a
	>
	<input
		type="text"
		name="blogKey"
		placeholder="Blog key"
		class="p-1 outline-1"
		required
	/>
	<button class="btn" formaction="?/removeBlog">Delete Post</button>
</form>

<form use:enhance method="POST" class="flex space-x-2 pt-4">
	{#await data.commentsInitialized then initialized}
		<button
			class="flex-1 border p-2"
			formaction="?/{initialized ? 'drop' : 'create'}Comments"
		>
			{initialized ? 'Remove Comments Table' : 'Initialize Comments'}</button
		>
	{/await}

	{#await data.rocksInitialized then initialized}
		<button
			class="flex-1 border p-2"
			formaction="?/{initialized ? 'drop' : 'create'}Rocks"
			>{initialized ? 'Remove Rocks Table' : 'Initialize Rocks'}</button
		>
	{/await}
</form>
