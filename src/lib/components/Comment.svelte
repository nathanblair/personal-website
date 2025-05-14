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

	function cancel(e: Event) {
		e.preventDefault()
		showSubmit = false
		commentBody = comment.body
	}
</script>

<div
	in:slide|global={{ duration: 100, delay: index * 100 }}
	class="my-3 drop-shadow-md"
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
				<span class="text-slate-500"
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
	<form use:enhance method="post" class="flex" onreset={cancel}>
		<textarea
			rows="3"
			name="body"
			{readonly}
			class="my-2 w-full resize-none bg-slate-100 outline-0 read-only:pointer-events-none dark:bg-slate-900"
			bind:value={commentBody}
			required
			oninput={() => (showSubmit = commentBody !== comment.body)}
		></textarea>
		{#if showSubmit}
			<div
				class="flex flex-col"
				transition:slide={{ duration: 500, axis: 'x' }}
			>
				<button
					formaction="/comment/{comment.slug}/{comment.id}?/edit"
					class="m-2"
				>
					<Check />
				</button>
				<button type="reset" class="m-2"><Ban /></button>
			</div>
		{/if}
	</form>
	<div class="my-2 flex items-center justify-end">
		<Rock {comment} />
		{#if !readonly}
			<form method="post" use:enhance>
				<button
					formaction="/comment/{comment.slug}/{comment.id}?/delete"
					class="btn">Delete</button
				>
			</form>
		{/if}
	</div>
</div>
