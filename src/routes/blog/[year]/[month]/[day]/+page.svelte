<script lang="ts">
	import BlogList from '$lib/components/BlogList.svelte'
	import { getLocaleContext } from '$lib/datetime.js'

	let { data } = $props()

	const { locale, timeZone } = getLocaleContext()
</script>

<div
	class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
	<BlogList blogSlugs={data.blogs.blogSlugs} {locale} {timeZone} />
</div>
