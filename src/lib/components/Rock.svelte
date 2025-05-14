<script lang="ts">
	import { enhance } from '$app/forms'

	import RockIcon from '@lucide/svelte/icons/hand-metal'

	let {
		commentId,
		rocked,
		rockCount,
	}: { commentId: number; rocked: boolean; rockCount: number } = $props()

	let form: HTMLFormElement

	$inspect(commentId, rocked)
</script>

<form
	method="POST"
	use:enhance
	bind:this={form}
	action={`/rock/${commentId}?/toggle`}
>
	<input
		type="checkbox"
		id="rocked-{commentId}"
		class="peer checkbox sr-only"
		tabindex="0"
		checked={rocked}
		onchange={() => form.requestSubmit()}
	/>

	<label
		for="rocked-{commentId}"
		class="mr-4 flex w-auto cursor-pointer peer-focus-within:ring-1"
	>
		<RockIcon size={24} class="mx-1" />
		<span class="block">{rockCount}</span>
	</label>
</form>
