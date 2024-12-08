<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import type { Session } from '$lib/types'
	import { Ban, Check } from 'lucide-svelte'
	import { slide } from 'svelte/transition'
	import Rock from './Rock.svelte'

	let {
		comment,
		index,
	}: { comment: import('$lib/types').Comment; index: number } = $props()

	let show_submit = $state(false)
	let comment_body = $state(comment.body)
	let session = $page.data.session as Session
	let current_user_id = parseInt(session.user?.id ?? '0', 10)

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	async function handle_cancel() {
		show_submit = false
		comment_body = comment.body
	}
</script>

<div
	in:slide|global={{ duration: 100, delay: index * 100 }}
	class="card m-2 border p-2 drop-shadow-md bg-surface-100-900"
>
	<div class="flex items-center">
		<img
			class="mr-2 size-10 rounded-full border"
			src={comment.user_image}
			alt="User Avatar"
		/>
		<div class="flex flex-col">
			<span
				>{new Date(comment.date_posted)
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
			{#if comment.date_edited}
				<span class="text-surface-500"
					>Edited: {new Date(comment.date_edited)
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
			<span>{comment.user_name}</span>
		</div>
	</div>
	<form method="post" class="flex items-center" use:enhance>
		<textarea
			name="body"
			id="body"
			rows="3"
			readonly={comment.user_id !== current_user_id}
			class="form-textarea textarea my-2 resize-none p-2 read-only:pointer-events-none"
			bind:value={comment_body}
			required
			oninput={() => (show_submit = comment_body !== comment.body)}
		></textarea>
		{#if show_submit}
			<div class="flex flex-col">
				<button
					formaction="/comment/{comment.slug}/{comment.id}?/edit&locale={locale}&timeZone={timeZone}"
					class="btn btn-icon m-2 preset-filled-primary-500"
				>
					<Check />
				</button>
				<button
					onclick={handle_cancel}
					onsubmit={() => {}}
					class="btn btn-icon m-2 preset-filled-error-500"
				>
					<Ban />
				</button>
			</div>
		{/if}
	</form>
	<div class="m-2 flex flex-wrap justify-end justify-items-center">
		<Rock {comment} />
		<form method="post" class="flex" use:enhance>
			{#if session.user?.admin}
				<button
					formaction="/comment/{comment.slug}/{comment.id}?/delete"
					class="btn ml-1 preset-filled-error-500">Delete</button
				>
			{/if}
		</form>
	</div>
</div>
