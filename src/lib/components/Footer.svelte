<script>
	import { name } from '$lib/constants.js'

	const year = new Date().getFullYear()
</script>

<footer
	class="sticky bottom-0 py-2 text-center opacity-95 bg-surface-100-900 dark:text-surface-300"
>
	&copy; {year} <strong>{name}</strong>
</footer>
