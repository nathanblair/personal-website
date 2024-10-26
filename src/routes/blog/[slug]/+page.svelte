<script>
	import { page } from '$app/stores'
</script>

<svelte:head>
	{#await $page.data.blog_fetch then blog}
		<title>{blog.title}</title>
		<meta name="description" content={$page.data.description} />
		{@html `<script type="application/ld+json">${JSON.stringify(blog.structured_data)}</script>`}
	{:catch error}
		<p>{error}</p>
	{/await}
</svelte:head>

{#await $page.data.blog_fetch}
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
{:then blog}
	<header class="my-4 text-center sm:mx-44 sm:my-0">
		<h1 class="mb-2 text-2xl">{blog.title}</h1>
		<h2 class="text-xl text-surface-500">{blog.date}</h2>
	</header>

	<div
		class="markdown-body mx-8 !mb-8 mt-2 overflow-x-scroll !bg-surface-100 p-8 !text-surface-900 sm:mx-36 sm:mt-10 dark:!bg-surface-900 dark:!text-surface-100"
	>
		{@html blog.content}
	</div>
{:catch error}
	<p>{error}</p>
{/await}
