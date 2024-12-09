<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import Comment from '$lib/components/Comment.svelte'

	let { data } = $props()

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
</script>

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

{#await data.blog_fetch then blog}
	{#if blog.comments_enabled}
		<form method="POST" use:enhance class="mx-2 my-1">
			<textarea
				class="form-textarea textarea"
				name="comment"
				id="comment"
				required
				placeholder="Enter a comment"
			></textarea>
			<button
				type="submit"
				class="btn my-3 w-full preset-tonal-primary lg:w-auto"
				formaction="/comment/{$page.params
					.slug}?/submit&locale={locale}&timeZone={timeZone}">Submit</button
			>
		</form>

		{#await data.comments}
			{#each Array(5) as _}
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
			{/each}
		{:then comments}
			{#each comments as comment, index}
				<Comment {comment} {index} />
			{/each}
		{:catch error}
			<p class="card m-2">{error.message}</p>
		{/await}
	{/if}
{/await}
