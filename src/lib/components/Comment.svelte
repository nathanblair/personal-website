<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { comments_table_name } from '$lib/constants.ts'
	import type { Comment, Session } from '$lib/types'
	import { Ban, Check } from 'lucide-svelte'
	import { slide } from 'svelte/transition'
	import Rock from './Rock.svelte'

	let { comment, index }: { comment: Comment; index: number } = $props()

	let show_submit = $state(false)
	let comment_body = $state(comment.body)
	let session = $page.data.session as Session
	let current_user_id = parseInt(session.user?.id ?? '0', 10)

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	function cancel() {
		show_submit = false
		comment_body = comment.body
	}

	async function edit() {
		const uri = new URL(
			`/api/${comments_table_name}/${comment.slug}/${comment.id}`,
			window.location.origin,
		)
		uri.searchParams.append('locale', locale)
		uri.searchParams.append('timeZone', timeZone)
		const cr = await fetch(uri, {
			method: 'PATCH',
			body: JSON.stringify({ content: comment_body }),
		})

		comment = await cr.json()
		show_submit = false
	}
</script>

<div
	in:slide|global={{ duration: 100, delay: index * 100 }}
	class="card mx-4 my-3 border p-2 drop-shadow-md bg-surface-100-900 sm:mx-36"
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
	<div class="flex">
		<textarea
			rows="3"
			name="body"
			readonly={comment.user_id !== current_user_id}
			class="form-textarea textarea my-2 resize-none p-2 read-only:pointer-events-none"
			bind:value={comment_body}
			required
			oninput={() => (show_submit = comment_body !== comment.body)}
		></textarea>
		{#if show_submit}
			<div
				class="flex flex-col"
				transition:slide={{ duration: 500, axis: 'x' }}
			>
				<button
					onclick={edit}
					class="btn btn-icon m-2 preset-filled-primary-500"
				>
					<Check />
				</button>
				<button
					onclick={cancel}
					onsubmit={() => {}}
					class="btn btn-icon m-2 preset-filled-error-500"
				>
					<Ban />
				</button>
			</div>
		{/if}
	</div>
	<div class="m-2 flex items-center justify-end">
		<Rock {comment} />
		<form method="post" use:enhance>
			{#if session.user?.id === comment.user_id}
				<button
					formaction="/comment/{comment.slug}/{comment.id}?/delete"
					class="btn preset-filled-error-500">Delete</button
				>
			{/if}
		</form>
	</div>
</div>
