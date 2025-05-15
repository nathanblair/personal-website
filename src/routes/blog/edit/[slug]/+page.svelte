<script lang="ts">
	import BlogForm from '$lib/components/BlogForm.svelte'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<BlogForm
	title={data.blog.title}
	content={data.blog.content}
	commentsEnabled={data.blog.commentsEnabled}
	contentType={data.blog.contentType}
	date={data.blog.date}
/>
