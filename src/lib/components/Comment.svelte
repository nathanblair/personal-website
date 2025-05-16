<script lang="ts">
	import { enhance } from '$app/forms'

	import type { ActionResult } from '@sveltejs/kit'
	import { slide } from 'svelte/transition'

	import Ban from '@lucide/svelte/icons/ban'
	import Check from '@lucide/svelte/icons/check'

	import Rock from './Rock.svelte'

	import { formatDisplayDateTime } from '$lib/datetime'
	import type { Comment } from '$lib/types/comment'

	let {
		comment,
		index,
		readonly,
		rocked,
		rockCount,
		locale,
		timeZone,
	}: {
		comment: Comment
		index: number
		readonly: boolean
		rocked: boolean
		rockCount: number
		locale: string
		timeZone: string
	} = $props()

	let dateEdited = $state(comment.dateEdited)
	let commentBody = $state(comment.body)
	let showSubmit = $state(false)

	function cancel(e: Event) {
		e.preventDefault()
		showSubmit = false
		commentBody = comment.body
	}

	function inputChanged() {
		showSubmit = commentBody !== comment.body
	}

	function handleEditResult({ result }: { result: ActionResult }) {
		if (result.type === 'success') {
			commentBody = result.data?.body
			dateEdited = result.data?.dateEdited
			showSubmit = false
		}
	}

	function editHandler() {
		return handleEditResult
	}
</script>

<div
	in:slide|global={{ duration: 100, delay: index * 100 }}
	class="drop-shadow-md"
>
	<div class="flex items-center">
		<img
			class="mr-2 size-10 rounded-full border"
			src={comment.userImage}
			alt="User Avatar"
		/>
		<div class="flex flex-col">
			<span>{formatDisplayDateTime(comment.datePosted, locale, timeZone)}</span>

			{#if dateEdited}
				<span class="text-slate-500"
					>Edited: {formatDisplayDateTime(dateEdited, locale, timeZone)}</span
				>
			{/if}

			<span>{comment.userName}</span>
		</div>
	</div>

	<form use:enhance={editHandler} method="post" class="flex" onreset={cancel}>
		<input type="hidden" name="locale" value={locale} />
		<input type="hidden" name="timeZone" value={timeZone} />
		<input type="hidden" name="commentId" value={comment.id} />

		<textarea
			rows="3"
			name="body"
			{readonly}
			class="my-2 w-full resize-none bg-slate-100 outline-0 read-only:pointer-events-none dark:bg-slate-900"
			bind:value={commentBody}
			required
			oninput={inputChanged}
		></textarea>

		{#if showSubmit}
			<div
				class="flex flex-col"
				transition:slide={{ duration: 500, axis: 'x' }}
			>
				<button formaction="?/editComment" class="m-2">
					<Check />
				</button>
				<button type="reset" class="m-2"><Ban /></button>
			</div>
		{/if}
	</form>

	<div class="my-2 flex items-center justify-end">
		<Rock commentId={comment.id} {rocked} {rockCount} {readonly} />

		{#if !readonly}
			<form method="POST" use:enhance>
				<button formaction="?/deleteComment&commentId={comment.id}" class="btn"
					>Delete</button
				>
			</form>
		{/if}
	</div>
</div>
