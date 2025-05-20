<script lang="ts">
	import type { AnchorProps } from '$lib/types/components'

	let { crumbs, root }: { crumbs: AnchorProps[]; root: string } = $props()
	let parts = $derived(crumbs)
</script>

<!-- FIXME -->
<!-- Want to be able to pass a parameter that doesn't 'disable' the last link -->
<!-- Also want to be able to show a dropdown of other links at different sections of the breadcrumb -->
<nav aria-label="Breadcrumb">
	<ol class="flex list-inside !list-none items-center space-x-2">
		<li class="before:mr-2 before:text-gray-400 before:content-['/']">
			<a
				href="{root}/"
				class={parts.length === 0
					? 'pointer-events-none underline'
					: 'hover:underline'}
			>
				{root.split('/').pop()}
			</a>
		</li>

		{#each parts as part, i}
			<li class="before:mr-2 before:text-gray-400 before:content-['/']">
				<a
					href={part.href}
					class={i === parts.length - 1
						? 'pointer-events-none underline'
						: 'hover:underline'}
					aria-current={i === parts.length - 1 ? 'page' : undefined}
				>
					{part.label}
				</a>
			</li>
		{/each}
	</ol>
</nav>
