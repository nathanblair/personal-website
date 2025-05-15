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
		<a
			class="flex items-center px-2 py-3 pl-0"
			href="/blog/create"
			aria-label="create"
			title="Create a new blog post"><Create /></a
		>

		{#if page.route.id === '/blog/[slug]'}
			<form method="post" onsubmit={confirmSubmission} class="flex">
				<button
					class="p-2"
					id="delete"
					formaction="?/removeBlog"
					type="submit"
					title="Delete the blog post"><Trash /></button
				>
			</form>
			<a
				class="flex items-center p-2"
				href="/blog/edit/{page.params.slug}"
				aria-label="edit"
				title="Edit the blog post"><Edit /></a
			>
		{/if}
	</div>
{/if}

<div
	id="blog-main"
	class="flex flex-1 flex-col space-y-4"
	class:pt-3={!data?.session?.user?.admin}
>
	{@render children()}
</div>
