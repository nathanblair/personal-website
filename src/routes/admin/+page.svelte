<script>
	import { enhance } from '$app/forms'
	import Comment from '$lib/components/Comment.svelte'

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	const slug = 'admin'
	let { data } = $props()
</script>

{#await data.initialized then initialized}
	{#if initialized}
		<form method="POST" use:enhance class="mx-2 my-2">
			<button
				class="btn w-full preset-tonal lg:w-auto"
				formaction="/comment/{slug}/?/clean">Clean Slug</button
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
				formaction="/comment/{slug}/?/submit&locale={locale}&timeZone={timeZone}"
				>Submit</button
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
			<Comment
				index={0}
				current_user_id={data.session?.user?.id || ''}
				admin={data.session?.user?.admin || false}
				comment={{
					user_id: '0',
					slug: 'admin',
					user_name: 'Admin',
					id: '0',
					body: 'This is a test comment',
					date_edited: null,
					date_posted: new Date().toLocaleTimeString(),
				}}
			/>
			{#each comments.results as comment, index}
				<Comment
					{index}
					current_user_id={data.session?.user?.id || ''}
					admin={data.session?.user?.admin || false}
					{comment}
				/>
			{/each}
		{:catch error}
			<span class="text-error">Error: {error}</span>
		{/await}
	{:else}
		<form method="POST" use:enhance class="m-2">
			<button class="btn preset-tonal" formaction="/comment/{slug}/?/init"
				>Initialize Slug</button
			>
		</form>
	{/if}
{/await}
