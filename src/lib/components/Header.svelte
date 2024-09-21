<script>
	import GitHub from './GitHub.svelte'
	import LinkedIn from './LinkedIn.svelte'
</script>

<div id="app-bar">
	<nav>
		<a href="/" class="material-symbols">home</a>
		<a href="/about" class="material-symbols">person</a>
		<a href="/resume" class="material-symbols">work</a>
		<a href="/blog" class="material-symbols">news</a>
	</nav>

	<a
		href="https://github.com/nathanblair"
		target="_blank"
		class="display-inline-flex flex-justify-center flex-align-center"
	>
		<GitHub />
	</a>
	<a href="https://linkedin.com/in/engineerblair" target="_blank" class="">
		<LinkedIn />
	</a>
	<a href="mailto:me@nathanblair.rocks" class="material-symbols">email</a>
</div>

<style>
	#app-bar {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--background-color);
	}

	nav {
		flex: 1;
	}

	a {
		display: inline-block;
		font-size: var(--icon-dimension);
		padding: 8px 12px;
		color: inherit;
		text-decoration: none;
	}
</style>
