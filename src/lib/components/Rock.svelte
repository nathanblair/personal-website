<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import type { Session } from '$lib/types'
	import Heart from 'lucide-svelte/icons/heart'

	let { comment } = $props()

	let rock_form: HTMLFormElement

	let session = $page.data.session as Session
	let current_user_id = parseInt(session.user?.id ?? '0', 10)
	let rocked = $state(false)

	async function rocks() {
		const rock_request = await fetch(`/api/rock/${comment.slug}/${comment.id}`)
		const rocks = await rock_request.json()

		rocks.forEach((rock: any) => {
			if (rock.user_id === current_user_id) rocked = true
		})
		return { length: rocks.length }
	}
</script>

<form
	method="post"
	class="flex"
	action="/rock/{comment.slug}/{comment.id}?/rock"
	bind:this={rock_form}
	use:enhance
>
	{#await rocks() then r}
		<input
			type="checkbox"
			id="rocked-{comment.id}"
			name="rocked"
			class="peer checkbox sr-only"
			tabindex="0"
			onchange={() => rock_form.requestSubmit()}
			bind:checked={rocked}
		/>
		<label
			for="rocked-{comment.id}"
			class="badge btn label label-text mr-1 flex cursor-pointer preset-filled-tertiary-50-950 peer-checked:preset-filled-tertiary-300-700 peer-focus-within:ring-1 peer-focus-within:ring-primary-500"
		>
			<Heart size={16} />
			<span class="!m-0 block">{r.length}</span>
		</label>
	{/await}
</form>
