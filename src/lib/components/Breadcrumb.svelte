<script lang="ts">
	let { parts }: { parts: string[] } = $props()
</script>

<div class="flex space-x-2">
	<span>/</span>
	<a href="/blog/" class="inline hover:underline">blog</a>
	<span>/</span>
	{#each parts as part, i}
		{@const built = parts.slice(0, i + 1).join('/')}
		<a href="/blog/{built}" class="inline hover:underline">{part}</a>
		<span>/</span>
	{/each}
</div>
