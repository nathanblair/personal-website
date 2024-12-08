<script lang="ts">
	import { enhance } from '$app/forms'
	import Comment from '$lib/components/Comment.svelte'

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	const slug = 'admin'
	let { data } = $props()
</script>

{#snippet placeholder()}
	<div
		class="card placeholder block animate-pulse rounded-md
border-surface-contrast-900 p-6 drop-shadow-md bg-surface-100-900
text-surface-900-100"
	>
		<div class="placeholder animate-pulse text-xl font-bold"></div>
		<div class="placeholder animate-pulse text-surface-500"></div>
	</div>
{/snippet}

<form method="POST" use:enhance class="mx-2 my-2">
	<button
		class="btn my-2 w-full preset-tonal lg:w-auto"
		formaction="/comment/{slug}?/{data.comments_initialized ? 'clean' : 'init'}"
	>
		{data.comments_initialized
			? 'Remove Comments Table'
			: 'Initialize Comments'}</button
	>
	<button
		class="btn my-2 w-full preset-tonal lg:w-auto"
		formaction="/rock/{slug}?/{data.rocks_initialized ? 'clean' : 'init'}"
		>{data.rocks_initialized
			? 'Remove Rocks Table'
			: 'Initialize Rocks'}</button
	>
</form>

{#if data.comments_initialized && data.rocks_initialized}
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
			class="btn my-3 w-full preset-tonal-primary lg:w-auto"
			formaction="/comment/{slug}?/submit&locale={locale}&timeZone={timeZone}"
			>Submit</button
		>
	</form>
	{#await data.comments}
		{#each Array(5) as _}
			{@render placeholder()}
		{/each}
	{:then comment_response}
		{#each comment_response as comment, index}
			<Comment {comment} {index} />
		{/each}
	{/await}
{/if}
