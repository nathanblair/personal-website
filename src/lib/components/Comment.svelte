<script>
	import { enhance } from '$app/forms'
	import { Ban, Check, Heart } from 'lucide-svelte'
	import { slide } from 'svelte/transition'

	/** @type {{
	 comment: import('$lib/server/comments/api.js').Comment,
	 index: number,
	 date_posted: Date,
	 date_edited: Date?,
	 admin: boolean,
	 user_id: string,
	}}*/
	let { comment, date_posted, date_edited, index, user_id, admin } = $props()

	let readonly = $state(user_id !== comment.user_id)
	let show_submit = $state(false)
	let comment_body = $state(comment.body)
	let original_comment = comment.body

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	async function handle_input() {
		show_submit = comment_body !== original_comment
	}

	async function handle_cancel() {
		show_submit = false
		comment_body = original_comment
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
				>{date_posted
					.toLocaleTimeString(undefined, {
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
			{#if date_edited}
				<span class="text-surface-500"
					>Edited: {date_edited
						.toLocaleTimeString(undefined, {
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
			{readonly}
			class="form-textarea textarea my-2 resize-none p-2 read-only:pointer-events-none"
			bind:value={comment_body}
			required
			oninput={handle_input}
		></textarea>
		{#if show_submit}
			<div class="flex flex-col">
				<button
					formaction="/comment/?/edit&id={comment.id}&locale={locale}&timeZone={timeZone}"
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
		<form method="post" class="flex" use:enhance={() => () => {}}>
			<button
				formaction="/comment/?/rock&id={comment.id}"
				class="badge btn mr-1 preset-filled-tertiary-50-950"
			>
				<Heart size={16} />
				<span class="">{comment.rocks}</span>
			</button>
		</form>
		<form method="post" class="flex" use:enhance>
			{#if admin}
				<button
					formaction="/comment/?/delete&id={comment.id}"
					class="btn ml-1 preset-filled-error-500">Delete</button
				>
			{/if}
		</form>
	</div>
</div>
