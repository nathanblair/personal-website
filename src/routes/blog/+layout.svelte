<script>
	import { page } from '$app/stores'

	import Back from 'svelte-lucide/ArrowLeft.svelte'
	import Edit from 'svelte-lucide/FilePen.svelte'
	import Create from 'svelte-lucide/FilePlus.svelte'
	import Trash from 'svelte-lucide/Trash.svelte'

	let { children } = $props()

	/** * @param {SubmitEvent} event */
	async function confirm_submission(event) {
		console.log(event.submitter)
		const confirmed = confirm(
			`Are you sure you want to ${event?.submitter?.id} this blog post?`,
		)

		if (!confirmed) event.preventDefault()
	}

	function go_back() {
		window.history.back()
	}
</script>

<div class="">
	{#if $page.route.id === '/blog/[slug]'}
		<button class="btn p-7 preset-filled-primary-500" onclick={go_back}
			><Back /></button
		>
	{/if}
	{#if $page.data.is_admin}
		<div id="blog-actions" class="float-right flex">
			<form method="post" onsubmit={confirm_submission} class="flex">
				<button
					class="btn-icon m-2 p-0"
					id="delete"
					name="delete"
					formaction="?/remove"
					disabled={$page.route.id !== '/blog/[slug]'}
					type="submit"
					title="Delete the blog post"><Trash /></button
				>
				<button
					class="btn-icon m-2 p-0"
					id="edit"
					name="edit"
					formaction="?/edit"
					disabled={$page.route.id !== '/blog/[slug]'}
					type="submit"
					title="Edit the blog post"><Edit /></button
				>
			</form>
			<a
				class="btn-icon m-2 p-0"
				href="/blog/create"
				id="create"
				aria-label="create"
				title="Create a new blog post"><Create /></a
			>
		</div>
	{/if}
</div>

<div id="blog-main" class="flex flex-1 flex-col">
	{@render children()}
</div>
