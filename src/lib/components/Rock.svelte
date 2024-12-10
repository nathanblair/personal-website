<script lang="ts">
	import { page } from '$app/stores'
	import type { Session } from '$lib/types'
	import Rock from 'lucide-svelte/icons/hand-metal'
	import { onMount } from 'svelte'

	let { comment } = $props()

	let session = $page.data.session as Session
	let rocked = $state(false)
	let rock_count = $state(0)

	let current_user_id = parseInt(session.user?.id ?? '0', 10)

	onMount(rock)

	async function rock(method: 'GET' | 'PATCH' = 'GET') {
		const rr = await fetch(`/api/rock/${comment.slug}/${comment.id}`, {
			method,
		})
		const rocks = await rr.json()

		rocks.forEach((rock: any) => {
			if (rock.user_id === current_user_id) rocked = true
		})
		rock_count = rocks.length
	}
</script>

<input
	type="checkbox"
	id="rocked-{comment.id}"
	class="peer checkbox sr-only"
	tabindex="0"
	onchange={() => rock('PATCH')}
	bind:checked={rocked}
/>
<label
	for="rocked-{comment.id}"
	class="badge-icon mr-4 flex w-auto cursor-pointer peer-focus-within:ring-1 peer-focus-within:ring-primary-500"
>
	<Rock
		size={24}
		class="mx-1 stroke-primary-300 {rocked ? 'fill-primary-300' : ''}"
		strokeWidth={rocked ? 0 : 1.5}
	/>
	<span class="!m-0 block">{rock_count}</span>
</label>
