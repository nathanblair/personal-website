<script>
	import { enhance } from '$app/forms'
	import { Ban, Check, Heart } from 'lucide-svelte'
	import { slide } from 'svelte/transition'

	/** @type {{
	 comment: BlogComment,
	 index: number,
	 admin: boolean,
	 current_user_id: string,
	}}*/
	let { comment, index, current_user_id, admin } = $props()

	let show_submit = $state(false)
	let comment_body = $state(comment.body)
	let rocked_by_user = $state(comment.rocked_by_user)
	$inspect(comment.rocked_by_user)

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	/** @type {HTMLFormElement}*/
	let rock_form

	async function handle_input() {
		show_submit = comment_body !== comment.body
	}

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
			readonly={current_user_id !== comment.user_id}
			class="form-textarea textarea my-2 resize-none p-2 read-only:pointer-events-none"
			bind:value={comment_body}
			required
			oninput={handle_input}
		></textarea>
		{#if show_submit}
			<div class="flex flex-col">
				<button
					formaction="/comment/{comment.slug}?/edit&id={comment.id}&locale={locale}&timeZone={timeZone}&user_id={current_user_id}"
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
		<form
			method="post"
			class="flex"
			action="/rock/{comment.slug}?/rock&id={comment.id}&rocked={rocked_by_user}&user_id={current_user_id}"
			bind:this={rock_form}
			use:enhance={() => () => {}}
		>
			<input
				type="checkbox"
				id="rocked-{comment.id}"
				name="rocked"
				onchange={() => rock_form.requestSubmit()}
				class="peer checkbox sr-only"
				tabindex="0"
				value={rocked_by_user}
				bind:checked={rocked_by_user}
			/>
			<label
				for="rocked-{comment.id}"
				class="badge btn label label-text mr-1 flex cursor-pointer preset-filled-tertiary-50-950 peer-checked:preset-filled-tertiary-300-700 peer-focus-within:ring-1 peer-focus-within:ring-primary-500"
			>
				<Heart size={16} />
				<span class="!m-0 block">{comment.rock_count}</span>
			</label>
		</form>
		<form method="post" class="flex" use:enhance>
			{#if admin}
				<button
					formaction="/comment/{comment.slug}?/delete&id={comment.id}&user_id={current_user_id}"
					class="btn ml-1 preset-filled-error-500">Delete</button
				>
			{/if}
		</form>
	</div>
</div>
