<script lang="ts">
	import Blog from '$lib/components/Blog.svelte'
	import Comment from '$lib/components/Comment.svelte'
	import CommentForm from '$lib/components/CommentForm.svelte'
	import { locale, timeZone } from '$lib/datetime.js'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<svelte:head>
	<title>{data.blog.title}</title>
	<meta name="description" content={data.description} />
	{@html `<script type="application/ld+json">${JSON.stringify(data.blog.structuredData)}</script>`}
</svelte:head>

<Blog blog={data.blog} />

{#if data.blog.commentsEnabled}
	<CommentForm {locale} {timeZone}></CommentForm>

	{#each data.comments as comment, index (comment.id)}
		<Comment
			{comment}
			{index}
			readonly={data.session?.user?.id !== comment.userId ||
				!data.session?.user?.admin}
			rocked={data.rocks[comment.id].rocked}
			rockCount={data.rocks[comment.id].count}
		/>
	{/each}
{/if}
