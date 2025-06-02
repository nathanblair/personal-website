<script lang="ts">
	import type { AnchorProps } from '$lib/types/components'

	let { crumbs, root }: { crumbs: AnchorProps[]; root: string } = $props()
	let parts = $derived(crumbs)
</script>

<!-- FIXME -->
<!-- want to be able to show a dropdown of other links at different sections of the breadcrumb -->
<nav aria-label="Breadcrumb">
	<ol class="flex list-inside !list-none items-center space-x-2">
		<li class="before:mr-2 before:text-gray-400 before:content-['/']">
			<a
				href="{root}/"
				class={parts.length === 0 ? 'underline' : 'hover:underline'}
				class:point-events-none={parts.length === 0 || parts[0].disabled}
				class:cursor-default={parts.length === 0 || parts[0].disabled}
			>
				{root.split('/').pop()}
			</a>
		</li>

		{#each parts as part, i}
			{@const current = i === parts.length - 1}
			<li class="before:mr-2 before:text-gray-400 before:content-['/']">
				<a
					href={part.href}
					class:point-events-none={part.disabled}
					class:cursor-default={part.disabled}
					class:underline={current}
					class:hover:underline={!current}
					aria-current={current ? 'page' : undefined}
				>
					{part.label}
				</a>
			</li>
		{/each}
	</ol>
</nav>
