<script lang="ts">
	let { parts, root }: { parts: string[]; root: string } = $props()
</script>

<!-- FIXME -->
<!-- Could also add a dropdown next to each part link -->
<!-- that lists other adjacent parts for that part -->
<div class="flex space-x-2">
	<span>/</span>
	<a href="{root}/" class="inline hover:underline">{root.split('/').pop()}</a>
	<span>/</span>
	{#each parts as part, i}
		{@const built = parts.slice(0, i + 1).join('/')}
		<a href="{root}/{built}" class="inline hover:underline">{part}</a>
		<span>/</span>
	{/each}
</div>
