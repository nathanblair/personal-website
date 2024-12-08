<script lang="ts">
	import { localStore } from '$lib/storage/local.svelte'

	import Moon from 'lucide-svelte/icons/moon'
	import Sun from 'lucide-svelte/icons/sun'

	let dark_mode = localStore('dark_mode', true)

	$effect(() => {
		document.body.classList.toggle('dark', dark_mode.value)
	})
</script>

<label for="dark-toggle" class="mx-2">
	<input
		id="dark-toggle"
		type="checkbox"
		class="hidden"
		bind:checked={dark_mode.value}
	/>
	<span
		class="flex h-6 w-10 cursor-pointer items-center rounded-full p-0.5 border-surface-400-600 hover:brightness-90 dark:hover:brightness-110 {dark_mode.value
			? 'preset-filled-primary-500'
			: 'preset-filled-surface-200-800'}"
	>
		<span
			class="!translate-x-{dark_mode.value
				? '4'
				: '0'} rounded-full bg-surface-50 p-0.5 transition duration-200 ease-in-out"
		>
			{#if dark_mode.value}
				<Moon class="size-4" />
			{:else}
				<Sun class="size-4" />
			{/if}
		</span>
	</span>
</label>
