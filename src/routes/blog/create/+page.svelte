<script lang="ts">
	import BlogForm from '$lib/components/BlogForm.svelte'

	import { getLocaleContext } from '$lib/datetime.ts'

	const { locale, timeZone } = getLocaleContext()
</script>

<BlogForm {locale} {timeZone} />
