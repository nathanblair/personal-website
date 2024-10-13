<script>
	import { page } from '$app/stores'
</script>

{#await $page.data.blogs_fetch}
	<p>Fetching blogs...</p>
	<div class="w-full space-y-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-center space-x-4">
				<div class="placeholder-circle size-16 animate-pulse"></div>
				<div class="placeholder-circle size-14 animate-pulse"></div>
				<div class="placeholder-circle size-10 animate-pulse"></div>
			</div>
		</div>
		<div class="space-y-4">
			<div class="placeholder animate-pulse"></div>
			<div class="grid grid-cols-4 gap-4">
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
			</div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
		</div>
	</div>
{:then blogs}
	{#each blogs as blog}
		<a class="" href={blog.url}>{blog.date} - {blog.title}</a>
	{/each}
{:catch error}
	<p>{error}</p>
{/await}
