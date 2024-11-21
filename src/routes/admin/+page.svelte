<script>
	import { enhance } from '$app/forms'
	import Comment from '$lib/components/Comment.svelte'

	let { data } = $props()
</script>

{#await data.initialized then initialized}
	{#if initialized}
		<form method="POST" use:enhance class="mx-2 my-2">
			<button
				class="btn w-full preset-tonal lg:w-auto"
				formaction="?/clean-test-slug">Clean Test Slug</button
			>
		</form>

		<form method="POST" use:enhance class="mx-2 my-1">
			<textarea
				class="form-textarea textarea"
				name="comment"
				id="comment"
				required
				placeholder="Enter a comment"
			></textarea>
			<button
				type="submit"
				class="btn my-3 preset-tonal-primary"
				formaction="?/submit">Submit</button
			>
		</form>

		{#await data.comments}
			{#each Array(5) as _}
				<div
					class="card placeholder block animate-pulse rounded-md
		border-surface-contrast-900 p-6 drop-shadow-md bg-surface-100-900
		text-surface-900-100"
				>
					<div class="placeholder animate-pulse text-xl font-bold"></div>
					<div class="placeholder animate-pulse text-surface-500"></div>
				</div>
			{/each}
		{:then comments}
			{#each comments.results as comment, index}
				{@const date = new Date(comment.date)}
				<Comment
					{comment}
					{date}
					{index}
					admin={data.session?.user?.admin || false}
				/>
			{/each}
		{:catch error}
			<span class="text-error">Error: {error}</span>
		{/await}
	{:else}
		<form method="POST" use:enhance class="m-2">
			<button class="btn preset-tonal" formaction="?/init-test-slug"
				>Initialize Test Slug</button
			>
		</form>
	{/if}
{/await}

<style>
</style>
