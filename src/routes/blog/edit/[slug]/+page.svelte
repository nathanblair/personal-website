<script>
	import { page } from '$app/stores'

	import BlogForm from '$lib/components/BlogForm.svelte'
</script>

{#await $page.data.blog_fetch}
	<p>Fetching blog...</p>
{:then blog}
	<BlogForm
		title={blog.blog_title}
		date={blog.date}
		content_type={blog.content_type}
		content={blog.content}
		comments_enabled={blog.comments_enabled}
		operation="Update"
	/>
{:catch error}
	<p>{error}</p>
{/await}
