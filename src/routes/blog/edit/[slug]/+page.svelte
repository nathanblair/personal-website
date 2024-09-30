<script>
	import { page } from '$app/stores'

	import BlogForm from '$lib/components/BlogForm.svelte'
</script>

<BlogForm
	title={$page.data.blog_title}
	date={$page.data.date}
	content_type={$page.data.content_type}
	content={$page.data.content}
	operation="Update"
/>
