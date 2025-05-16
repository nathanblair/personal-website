<script lang="ts">
	import Blog from '$lib/components/Blog.svelte'
	import CommentForm from '$lib/components/CommentForm.svelte'
	import CommentList from '$lib/components/CommentList.svelte'

	import { getLocaleContext } from '$lib/datetime.ts'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const { locale, timeZone } = getLocaleContext()
</script>

<svelte:head>
	<title>{data.blog.title}</title>
	<meta name="description" content={data.description} />
	{@html `<script type="application/ld+json">${JSON.stringify(data.blog.structuredData)}</script>`}
</svelte:head>

<Blog blog={data.blog} {locale} {timeZone} />

{#if data.blog.commentsEnabled}
	<CommentForm {locale} {timeZone}></CommentForm>

	<CommentList
		comments={data.comments}
		rocks={data.rocks}
		{locale}
		{timeZone}
		admin={data.session?.user?.admin}
		userId={data.session?.user?.id}
	/>
{/if}
