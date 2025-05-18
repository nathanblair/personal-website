<script lang="ts">
	import Edit from '@lucide/svelte/icons/file-pen'

	import Blog from '$lib/components/Blog.svelte'
	import CommentForm from '$lib/components/CommentForm.svelte'
	import CommentList from '$lib/components/CommentList.svelte'

	import { page } from '$app/state'
	import { getLocaleContext } from '$lib/datetime.ts'
	import { BlogPostingSD } from '$lib/structured_data/blog_posting.ts'
	import { me } from '$lib/structured_data/person.ts'
	import type { PageProps } from '../[year]/[month]/[day]/[slug]/$types'

	let { data }: PageProps = $props()

	const { locale, timeZone } = getLocaleContext()

	const structuredData = new BlogPostingSD(data.blog.date, data.blog.title, me)
		.structured_data
</script>

<svelte:head>
	<title>{data.blog.title}</title>
	<meta name="description" content={data.description} />
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

{#if data.session?.user?.admin}
	<form method="post" class="absolute top-0 left-0 flex w-full justify-between">
		<a
			class="btn-icon float-right flex items-center"
			href="/blog/edit/{page.params.slug}"
			aria-label="edit"
			title="Edit the blog post"><Edit /></a
		>
	</form>
{/if}

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
