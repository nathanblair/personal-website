<script>
	import { page } from '$app/stores'

	let { children } = $props()

	/** * @param {SubmitEvent} event */
	async function confirm_submission(event) {
		console.log(event.submitter)
		const confirmed = confirm(
			`Are you sure you want to ${event?.submitter?.id} this blog post?`
		)

		if (!confirmed) event.preventDefault()
	}
</script>

{#if $page.data.is_admin}
	<div id="blog-actions">
		<form method="post" onsubmit={confirm_submission}>
			<button
				id="delete"
				name="delete"
				formaction="?/remove"
				disabled={$page.route.id !== '/blog/[slug]'}
				type="submit"
				><span class="material-symbols">delete_forever</span></button
			>
			<button
				id="edit"
				name="edit"
				formaction="?/edit"
				disabled={$page.route.id !== '/blog/[slug]'}
				type="submit"><span class="material-symbols">edit</span></button
			>
		</form>

		<a href="/blog/create" id="create" aria-label="create"
			><span class="material-symbols">note_stack_add</span></a
		>
	</div>
{/if}

<div id="blog-main">
	{@render children()}
</div>

<style>
	#blog-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#blog-main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	a {
		display: block;
		text-decoration: none;
	}

	a,
	button {
		padding: 8px 12px;
	}

	button:disabled {
		cursor: default;
		opacity: 0.5;
	}
</style>
