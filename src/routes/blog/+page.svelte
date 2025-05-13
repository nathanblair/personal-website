<script lang="ts">
	import { formatBlogDateTime } from '$lib/datatime.js'
	import { slide } from 'svelte/transition'

	let { data } = $props()
</script>

<div
	class="m-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
	{#await data.blogsFetch}
		{#each Array(16) as _}
			<div
				class="card placeholder border-surface-contrast-900 bg-surface-100-900 text-surface-900-100
			block animate-pulse rounded-md p-6
			drop-shadow-md"
			>
				<div class="placeholder animate-pulse text-xl font-bold"></div>
				<div class="placeholder text-surface-500 animate-pulse"></div>
			</div>
		{/each}
	{:then blogs}
		{#each blogs as blog, index}
			<a
				in:slide|global={{ duration: 100, delay: index * 100 }}
				class="card border-surface-contrast-900 bg-surface-100-900 text-surface-900-100 block rounded-md p-6 drop-shadow-md"
				href={`/blog/${blog.slug}`}
			>
				<h1 class="text-xl font-bold">{blog.title}</h1>
				<h2 class="text-surface-500">{formatBlogDateTime(blog.date)}</h2>
			</a>
		{/each}
	{:catch error}
		<p>{error}</p>
	{/await}
</div>
