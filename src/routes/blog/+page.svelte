<script lang="ts">
	import { formatBlogDateTime } from '$lib/datetime.js'
	import { slide } from 'svelte/transition'

	let { data } = $props()
</script>

{#snippet blogPlaceholder()}
	<div
		class="block animate-pulse
			rounded-md border-slate-100 bg-slate-100
			p-6 text-slate-900 drop-shadow-md dark:bg-slate-900
			dark:text-slate-100"
	>
		<div class="animate-pulse text-xl font-bold"></div>
		<div class="animate-pulse text-slate-500"></div>
	</div>
{/snippet}

<div
	class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
	{#await data.blogsFetch}
		{#each Array(16) as _}
			{@render blogPlaceholder()}
		{/each}
	{:then blogs}
		{#each blogs as blog, index}
			<a
				in:slide|global={{ duration: 100, delay: index * 100 }}
				class="block rounded-md border-slate-100 bg-slate-100 p-6 text-slate-900 drop-shadow-md dark:bg-slate-900 dark:text-slate-100"
				href={`/blog/${blog.slug}`}
			>
				<h1 class="text-xl font-bold">{blog.title}</h1>
				<h2 class="text-slate-500">{formatBlogDateTime(blog.date)}</h2>
			</a>
		{/each}
	{:catch error}
		<p>{error}</p>
	{/await}
</div>
