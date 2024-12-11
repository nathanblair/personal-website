<script lang="ts">
	import { page } from '$app/stores'

	import Back from 'lucide-svelte/icons/arrow-left'
	import Edit from 'lucide-svelte/icons/file-pen'
	import Create from 'lucide-svelte/icons/file-plus'
	import Trash from 'lucide-svelte/icons/trash'

	let { children, data } = $props()

	async function confirm_submission(event: SubmitEvent) {
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
	{#if data?.session?.user?.admin}
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
