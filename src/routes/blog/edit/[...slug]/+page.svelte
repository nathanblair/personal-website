<script lang="ts">
	import BlogForm from '$lib/components/BlogForm.svelte'

	import { getLocaleContext } from '$lib/datetime.ts'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const { locale, timeZone } = getLocaleContext()
</script>

<BlogForm
	title={data.blog.title}
	content={data.blog.content}
	commentsEnabled={data.blog.commentsEnabled}
	contentType={data.blog.contentType}
	dateTime={data.blog.date}
	{locale}
	{timeZone}
/>
