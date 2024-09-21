<script>
	import { name } from '$lib/constants.js'

	const year = new Date().getFullYear()
</script>

<footer>
	&copy; {year} <strong>{name}</strong>
</footer>

<style>
	footer {
		position: sticky;
		bottom: 0;
		text-align: center;
		padding: 24px 0;
		width: 100%;
	}
</style>
