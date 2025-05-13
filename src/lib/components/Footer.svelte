<script lang="ts">
	import { MyName } from '$lib/constants'

	const year = new Date().getFullYear()
</script>

<footer
	class="bg-surface-100-900 text-surface-600-400 sticky bottom-0 py-2 text-center opacity-95"
>
	&copy; {year} <strong>{MyName}</strong>
</footer>
