<script lang="ts">
	import { page } from '$app/state'
	import Blog from '$lib/components/Blog.svelte'
	import Comment from '$lib/components/Comment.svelte'
	import CommentForm from '$lib/components/CommentForm.svelte'
	import { locale, timeZone } from '$lib/datatime.js'

	let { data } = $props()
</script>

{#snippet blogPlaceholder()}
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

{#snippet commentPlaceholder()}
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
{/snippet}

<svelte:head>
	{#await data.blog then blog}
		<title>{blog.title}</title>
		<meta name="description" content={data.description} />
		{@html `<script type="application/ld+json">${JSON.stringify(blog.structuredData)}</script>`}
	{:catch error}
		<p>{error}</p>
	{/await}
</svelte:head>

{#await data.blog}
	{@render blogPlaceholder()}
{:then blog}
	<Blog {blog} />
{:catch error}
	<p>{error}</p>
{/await}

{#await data.blog then blog}
	{#if blog.commentsEnabled}
		<CommentForm {locale} {timeZone} slug={page.params.slug}></CommentForm>

		{#await data.comments}
			{#each Array(5) as _}{@render commentPlaceholder()}{/each}
		{:then comments}
			{#each comments as comment, index}
				<Comment
					{comment}
					{index}
					readonly={data.session?.user?.id !== comment.userId}
				/>
			{/each}
		{/await}
	{/if}
{/await}
