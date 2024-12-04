<script>
	import { enhance } from '$app/forms'
	import Comment from '$lib/components/Comment.svelte'

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	const slug = 'admin'
	let { data } = $props()
</script>

{#snippet comment(
	/** @type {number} */ index,
	/** @type {BlogComment} */ comment,
)}
	<Comment
		{index}
		current_user_id={data.session?.user?.id || ''}
		admin={data.session?.user?.admin || false}
		{comment}
	/>
{/snippet}

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
	{#if data.comments_initialized}
		<button
			class="btn w-full preset-tonal lg:w-auto"
			formaction="/comment/{slug}?/clean">Remove Comments Table</button
		>
	{/if}
	{#if data.rocks_initialized}
		<button
			class="btn w-full preset-tonal lg:w-auto"
			formaction="/rock/{slug}?/clean">Remove Rocks Table</button
		>
	{/if}
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
		{#each comment_response as c, i}{@render comment(i, c)}{/each}
	{/await}
{/if}

{#if !data.comments_initialized}
	<form method="POST" use:enhance class="m-2">
		<button class="btn preset-tonal" formaction="/comment/{slug}?/init"
			>Initialize Comments</button
		>
	</form>
{/if}
{#if !data.rocks_initialized}
	<form method="POST" use:enhance class="m-2">
		<button class="btn preset-tonal" formaction="/rock/{slug}?/init"
			>Initialize Rocks</button
		>
	</form>
{/if}
