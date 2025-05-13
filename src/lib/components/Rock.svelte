<script lang="ts">
	import RockIcon from '@lucide/svelte/icons/hand-metal'

	import type { Comment } from '$lib/types/comments'

	let { comment }: { comment: Comment } = $props()

	let rocked = $state(false)
	let rockCount = $state(0)

	// onMount(rock)

	// async function rock(method: 'GET' | 'PATCH' = 'GET') {
	// 	const rr = await fetch(
	// 		`/api/${RocksTableName}/${comment.slug}/${comment.id}`,
	// 		{
	// 			method,
	// 		},
	// 	)
	// 	const rocks = await rr.json()

	// 	rocks.forEach((rock: Rock) => {
	// 		if (rock.userId === currentUserId) rocked = true
	// 	})
	// 	rockCount = rocks.length
	// }
</script>

<!-- onchange={() => rock('PATCH')} -->
<form method="POST">
	<input
		type="checkbox"
		id="rocked-{comment.id}"
		class="peer checkbox sr-only"
		tabindex="0"
		formaction="/rock/{comment.id}"
		bind:checked={rocked}
	/>
	<label
		for="rocked-{comment.id}"
		class="badge-icon peer-focus-within:ring-primary-500 mr-4 flex w-auto cursor-pointer peer-focus-within:ring-1"
	>
		<RockIcon
			size={24}
			class="stroke-primary-300 mx-1 {rocked ? 'fill-primary-300' : ''}"
			strokeWidth={rocked ? 0 : 1.5}
		/>
		<span class="!m-0 block">{rockCount}</span>
	</label>
</form>
