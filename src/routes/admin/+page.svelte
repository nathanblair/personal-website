<script lang="ts">
	import { enhance } from '$app/forms'

	import type { PageProps } from './$types'

	let { data, form }: PageProps = $props()
</script>

<form use:enhance method="POST" class="flex space-x-2 pt-4">
	{#await data.commentsInitialized then initialized}
		<button
			class="btn flex-1 p-2"
			formaction="?/{initialized ? 'drop' : 'create'}Comments"
		>
			{initialized ? 'Remove Comments Table' : 'Initialize Comments'}</button
		>
	{/await}

	{#await data.rocksInitialized then initialized}
		<button
			class="btn flex-1 p-2"
			formaction="?/{initialized ? 'drop' : 'create'}Rocks"
			>{initialized ? 'Remove Rocks Table' : 'Initialize Rocks'}</button
		>
	{/await}
</form>

<form use:enhance method="POST" class="flex space-x-2 pt-4">
	<a
		class="btn flex items-center justify-center text-nowrap"
		href="/blog/create"
		aria-label="create"
		title="Create a new blog post">Create Post</a
	>
	<input
		type="text"
		name="blogKey"
		placeholder="Blog key"
		class="3shrink min-w-0 p-1"
		required
	/>
	<button class="btn text-nowrap" formaction="?/removeBlog">Delete Post</button>
</form>

<form
	use:enhance={({}) =>
		({ update }) =>
			update({ reset: false })}
	method="POST"
	class="space-x-2 pt-4"
	action="?/listPrefixes"
>
	<input type="text" name="prefix" placeholder="Prefix" class="p-1" />
	<input
		type="text"
		name="delimiter"
		placeholder="Delimiter"
		class="p-1"
		value="/"
	/>
	<button class="btn">List Prefixes</button>

	{#if form?.prefixes}
		<div class="flex items-center space-x-2 pt-4">
			<label for="prefixes">Prefixes</label>
			<select
				name="prefixes"
				id="prefixes"
				multiple
				class="pointer-events-none w-1/4 p-1"
			>
				{#each form.prefixes as prefix}
					<option value={prefix}>{prefix}</option>
				{/each}
			</select>
		</div>
	{/if}
</form>
