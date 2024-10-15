<script>
	import { page } from '$app/stores'
	import BlogPlaceholder from '$lib/components/BlogPlaceholder.svelte'
</script>

<div
	class="m-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
	{#await $page.data.blogs_fetch}
		<p>Fetching blogs...</p>
		<BlogPlaceholder />
	{:then blogs}
		{#each blogs as blog}
			<a
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
