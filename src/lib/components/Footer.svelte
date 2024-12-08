<script lang="ts">
	import { name } from '$lib/constants'

	const year = new Date().getFullYear()
</script>

<footer
	class="sticky bottom-0 py-2 text-center opacity-95 bg-surface-100-900 text-surface-600-400"
>
	&copy; {year} <strong>{name}</strong>
</footer>
