<script lang="ts">
	import { page } from '$app/state'
	import Blog from '$lib/components/Blog.svelte'

	let { data } = $props()
</script>

{#snippet blog_placeholder()}
	<div class="mx-2 space-y-4 sm:mx-36">
		<div class="flex items-center justify-center">
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
			<div class="placeholder animate-pulse"></div>
			<div class="grid grid-cols-4 gap-4">
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
			</div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="grid grid-cols-4 gap-4">
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
			</div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
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
{/snippet}

<svelte:head>
	{#await data.blog_fetch then blog}
		<title>{blog.title}</title>
		<meta name="description" content={data.description} />
		{@html `<script type="application/ld+json">${JSON.stringify(blog.structured_data)}</script>`}
	{:catch error}
		<p>{error}</p>
	{/await}
</svelte:head>

{#await data.blog_fetch}
	{@render blog_placeholder()}
{:then blog}
	<!-- readonly={data.session?.user?.admin ? false : true || true} -->
	<Blog
		comments_enabled={blog.comments_enabled}
		date={blog.date}
		slug={page.params.slug}
		title={blog.title}
		content={blog.content}
		content_type={blog.content_type}
	/>
{/await}

<style>
	@import 'github-markdown-css/github-markdown.css';
</style>
