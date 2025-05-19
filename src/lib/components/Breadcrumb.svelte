<script lang="ts">
	import type { AnchorProps } from '$lib/types/components'

	let { crumbs, root }: { crumbs: AnchorProps[]; root: string } = $props()
	let parts = $derived(crumbs)
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex list-inside !list-none items-center space-x-2">
		<li
			class="list-item before:mr-2 before:text-gray-400 before:content-['/'] hover:underline"
		>
			<a href="{root}/" class="">
				{root.split('/').pop()}
			</a>
		</li>

		{#each parts as part, i}
			<li class="before:mr-2 before:text-gray-400 before:content-['/']">
				<a
					href={part.href}
					class="inline {i === parts.length - 1
						? 'pointer-events-none underline'
						: 'hover:underline'}"
					aria-current={i === parts.length - 1 ? 'page' : undefined}
				>
					{part.label}
				</a>
			</li>
		{/each}
	</ol>
</nav>
