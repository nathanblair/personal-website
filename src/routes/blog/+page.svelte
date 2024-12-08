<script lang="ts">
	import { slide } from 'svelte/transition'

	let { data } = $props()
</script>

<div
	class="m-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
	{#await data.blogs_fetch}
		{#each Array(16) as _}
			<div
				class="card placeholder block animate-pulse rounded-md
			border-surface-contrast-900 p-6 drop-shadow-md bg-surface-100-900
			text-surface-900-100"
			>
				<div class="placeholder animate-pulse text-xl font-bold"></div>
				<div class="placeholder animate-pulse text-surface-500"></div>
			</div>
		{/each}
	{:then blogs}
		{#each blogs as blog, index}
			<a
				in:slide|global={{ duration: 100, delay: index * 100 }}
				class="card block rounded-md border-surface-contrast-900 p-6 drop-shadow-md bg-surface-100-900 text-surface-900-100"
				href={blog.url}
			>
				<h1 class="text-xl font-bold">{blog.title}</h1>
				<h2 class="text-surface-500">{blog.date}</h2>
			</a>
		{/each}
	{:catch error}
		<p>{error}</p>
	{/await}
</div>
