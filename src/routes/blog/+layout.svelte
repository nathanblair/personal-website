<script lang="ts">
	import { page } from '$app/state'

	import Edit from '@lucide/svelte/icons/file-pen'
	import Create from '@lucide/svelte/icons/file-plus'
	import Trash from '@lucide/svelte/icons/trash'

	let { children, data } = $props()

	async function confirmSubmission(event: SubmitEvent) {
		const confirmed = confirm(
			`Are you sure you want to ${event?.submitter?.id} this blog post?`,
		)

		if (!confirmed) event.preventDefault()
	}
</script>

{#if data?.session?.user?.admin}
	<div id="blog-actions" class="flex">
		<form method="post" onsubmit={confirmSubmission} class="flex">
			<button
				class="p-2"
				id="delete"
				name="delete"
				formaction="?/remove"
				disabled={page.route.id !== '/blog/[slug]'}
				type="submit"
				title="Delete the blog post"><Trash /></button
			>
			<button
				class="p-2"
				id="edit"
				name="edit"
				formaction="?/edit"
				disabled={page.route.id !== '/blog/[slug]'}
				type="submit"
				title="Edit the blog post"><Edit /></button
			>
		</form>
		<a
			class="flex items-center p-2"
			href="/blog/create"
			id="create"
			aria-label="create"
			title="Create a new blog post"><Create /></a
		>
	</div>
{/if}

<div id="blog-main" class="flex flex-1 flex-col">
	{@render children()}
</div>
