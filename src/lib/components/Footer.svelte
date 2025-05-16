<script lang="ts">
	const { text } = $props()

	const year = new Date().getFullYear()
</script>

<footer
	class="sticky bottom-0 bg-slate-100 py-2 text-center text-slate-600 opacity-95 dark:bg-slate-900 dark:text-slate-400"
>
	&copy; {year} <strong>{text}</strong>
</footer>
