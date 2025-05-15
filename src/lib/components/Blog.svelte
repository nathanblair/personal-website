<script lang="ts">
	import { marked } from 'marked'

	import { formatDisplayTime, locale, timeZone } from '$lib/datetime'
	import type { StorageBlog } from '$lib/types/blog.ts'

	let { blog }: { blog: StorageBlog } = $props()
</script>

<header class="mb-3 w-auto space-y-2 text-center">
	<h1 class="text-2xl">{blog.title}</h1>
	<h2 class="text-xl text-slate-500">
		{formatDisplayTime(blog.date, locale, timeZone)}
	</h2>
	{#if blog.dateEdited}
		<h3 class="text-xl text-slate-500/50">
			Last edited: {formatDisplayTime(blog.dateEdited, locale, timeZone)}
		</h3>
	{/if}
</header>

<div
	class="markdown-body min-h-24 w-auto overflow-x-scroll bg-slate-100 p-4 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
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
