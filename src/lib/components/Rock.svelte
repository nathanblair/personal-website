<script lang="ts">
	import { enhance } from '$app/forms'

	import RockIcon from '@lucide/svelte/icons/drum'

	let {
		commentId,
		rocked,
		rockCount,
		readonly,
	}: {
		commentId: number
		rocked: boolean
		rockCount: number
		readonly: boolean
	} = $props()

	let form: HTMLFormElement
</script>

<form
	method="POST"
	class="group"
	use:enhance
	bind:this={form}
	action="?/toggleRock"
>
	<input type="hidden" name="commentId" value={commentId} />

	<input
		type="checkbox"
		id="rocked-{commentId}"
		class="peer checkbox sr-only"
		tabindex="0"
		checked={rocked}
		disabled={readonly}
		onchange={() => form.requestSubmit()}
	/>

	<label
		for="rocked-{commentId}"
		class="mr-4 flex w-auto peer-focus-within:ring-1 {readonly
			? 'cursor-not-allowed'
			: 'cursor-pointer'}"
		title={readonly ? 'Not signed in' : 'Rock this comment'}
	>
		<RockIcon class="mx-1 stroke-1 group-has-checked:fill-slate-500" />
		<span class="block">{rockCount}</span>
	</label>
</form>
