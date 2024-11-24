<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import Comment from '$lib/components/Comment.svelte'
</script>

{#await $page.data.initialized then initialized}
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
				class="btn my-3 w-full preset-tonal-primary lg:w-auto"
				formaction="/comment/?/submit">Submit</button
			>
		</form>

		{#await $page.data.comments}
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
			<Comment
				comment={{
					rocks: 3,
					user_id: '0',
					user_name: 'Admin',
					id: '0',
					body: 'This is a test comment',
					date_edited: null,
					date_posted: new Date().toLocaleTimeString(),
				}}
				date_posted={new Date()}
				date_edited={null}
				index={1}
				user_id={''}
				admin={$page.data.session?.user?.admin || false}
			/>

			{#each comments.results as comment, index}
				{@const date_posted = new Date(comment.date_posted)}
				{@const date_edited = comment.date_edited
					? new Date(comment.date_edited)
					: null}
				<Comment
					{comment}
					{date_posted}
					{date_edited}
					{index}
					user_id={$page.data.session?.user?.id || ''}
					admin={$page.data.session?.user?.admin || false}
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
