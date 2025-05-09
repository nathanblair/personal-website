<script lang="ts">
	import { page } from '$app/state'
	import Blog from '$lib/components/Blog.svelte'

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
</script>

{#await page.data.blog_fetch}
	<p>Fetching blog...</p>
{:then blog}
	<Blog
		slug={page.params.slug}
		title={blog.blog_title}
		date={blog.date}
		content_type={blog.content_type}
		content={blog.content}
		comments_enabled={blog.comments_enabled}
	/>
	<input type="hidden" name="locale" value={locale} />
	<input type="hidden" name="timeZone" value={timeZone} />
{:catch error}
	<p>{error}</p>
{/await}
