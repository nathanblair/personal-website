<script lang="ts">
	import BlogForm from '$lib/components/BlogForm.svelte'
	import { locale, timeZone } from '$lib/datetime.ts'
</script>

<BlogForm {locale} {timeZone} />
