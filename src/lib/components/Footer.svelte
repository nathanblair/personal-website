<script>
	import { name } from '$lib/constants.js'

	const year = new Date().getFullYear()
</script>

<footer>
	&copy; {year} <strong>{name}</strong>
</footer>

<style>
	footer {
		text-align: center;
		padding: 12px 0;
		/* position: fixed; */
		width: 100%;
		/* bottom: 0; */
	}
</style>
