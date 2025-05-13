<script lang="ts">
	import { marked } from 'marked'

	import { formatBlogDateTime } from '$lib/datatime.ts'
	import type { StorageBlog } from '$lib/types/blog'

	let { blog }: { blog: StorageBlog } = $props()
</script>

<header class="mt-8 w-auto space-y-2 text-center">
	<h1 class="text-2xl">{blog.title}</h1>
	<h2 class="text-surface-500 text-xl">
		{formatBlogDateTime(blog.date)}
	</h2>
</header>

<div
	class="markdown-body !bg-surface-100 !text-surface-900 dark:!bg-surface-900 dark:!text-surface-100 !mx-4 !my-12 min-h-24 w-auto overflow-x-scroll p-8 md:!mx-36"
>
	{#if blog.contentType === 'text/markdown'}
		{#await marked.parse(blog.content)}
			<p>Loading...</p>
		{:then html}
			{@html html}
		{/await}
	{:else if blog.contentType === 'text/html'}
		{@html blog.content}
	{:else if blog.contentType === 'text/plain'}
		{blog.content}
	{:else}
		<p>Unsupported content type</p>
	{/if}
</div>

<style>
	@import 'github-markdown-css/github-markdown.css';
</style>
