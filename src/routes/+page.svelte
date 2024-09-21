<script>
	import { name } from '$lib/constants.js'
</script>

<header>
	<h1>{name}</h1>

	<p>I am a <strong>tinkerer</strong>,</p>

	<p>a <strong>thinker</strong>,</p>

	<p>a <strong>teacher</strong>,</p>

	<p>I am an <em>engineer</em>.</p>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	h1 {
		font-size: 2em;
		padding: 20px 0;
		font-weight: normal;
	}

	p {
		font-size: 1.5em;
		margin: 0;
		padding: 20px 0;
	}

	strong {
		font-weight: bolder;
	}
</style>
