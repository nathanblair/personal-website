<script lang="ts">
	import { enhance } from '$app/forms'

	import Ban from '@lucide/svelte/icons/ban'
	import Check from '@lucide/svelte/icons/check'
	import { slide } from 'svelte/transition'

	import Rock from './Rock.svelte'

	import { locale } from '$lib/datatime.ts'
	import type { Comment } from '$lib/types/comments'

	let {
		comment,
		index,
		readonly,
	}: { comment: Comment; index: number; readonly: boolean } = $props()

	let showSubmit = $state(false)
	let commentBody = $state(comment.body)

	function cancel() {
		showSubmit = false
		commentBody = comment.body
	}
</script>

<div
	in:slide|global={{ duration: 100, delay: index * 100 }}
	class="card mx-4 my-3 p-2 drop-shadow-md sm:mx-36"
>
	<div class="flex items-center">
		<img
			class="mr-2 size-10 rounded-full border"
			src={comment.userImage}
			alt="User Avatar"
		/>
		<div class="flex flex-col">
			<span
				>{new Date(comment.datePosted)
					.toLocaleTimeString(locale, {
						timeZoneName: 'short',
						day: 'numeric',
						month: 'numeric',
						year: 'numeric',
						hour12: true,
						hour: 'numeric',
						minute: 'numeric',
						weekday: 'long',
					})
					.replaceAll(',', '')}</span
			>
			{#if comment.dateEdited}
				<span class="text-surface-500"
					>Edited: {new Date(comment.dateEdited)
						.toLocaleTimeString(locale, {
							timeZoneName: 'short',
							day: 'numeric',
							month: 'numeric',
							year: 'numeric',
							hour12: true,
							hour: 'numeric',
							minute: 'numeric',
							weekday: 'long',
						})
						.replaceAll(',', '')}</span
				>
			{/if}
			<span>{comment.userName}</span>
		</div>
	</div>
	<div class="flex">
		<textarea
			rows="3"
			name="body"
			{readonly}
			class="form-textarea bg-surface-100-900 textarea my-2 resize-none p-2 read-only:pointer-events-none"
			bind:value={commentBody}
			required
			oninput={() => (showSubmit = commentBody !== comment.body)}
		></textarea>
		{#if showSubmit}
			<div
				class="flex flex-col"
				transition:slide={{ duration: 500, axis: 'x' }}
			>
				<form use:enhance method="post">
					<button
						formaction="/comment/{comment.slug}/{comment.id}?/edit"
						class="btn btn-icon preset-filled-primary-500 m-2"
					>
						<Check />
					</button>
				</form>
				<button
					onclick={cancel}
					onsubmit={() => {}}
					class="btn btn-icon preset-filled-error-500 m-2"
				>
					<Ban />
				</button>
			</div>
		{/if}
	</div>
	<div class="m-2 flex items-center justify-end">
		<Rock {comment} />
		{#if !readonly}
			<form method="post" use:enhance>
				<button
					formaction="/comment/{comment.slug}/{comment.id}?/delete"
					class="btn preset-filled-error-500">Delete</button
				>
			</form>
		{/if}
	</div>
</div>
