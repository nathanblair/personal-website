<script lang="ts">
	import { enhance } from '$app/forms'
	import Blog from '$lib/components/Blog.svelte'

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
</script>

<form method="post" use:enhance>
	<Blog
		slug="create"
		title={''}
		date={new Date().toISOString()}
		content_type={'text/markdown'}
		content={''}
		comments_enabled={false}
	/>
	<input type="hidden" name="locale" value={locale} />
	<input type="hidden" name="timeZone" value={timeZone} />
	<button type="submit">Submit</button>
</form>
