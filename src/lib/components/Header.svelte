<script>
	import { page } from '$app/stores'

	import GitHub from './GitHub.svelte'
	import LinkedIn from './LinkedIn.svelte'
</script>

<div id="app-bar">
	<nav>
		<a href="/" title="Home" class="material-symbols">home</a>
		<a href="/about" title="About" class="material-symbols">person</a>
		<a href="/resume" title="Resumé" class="material-symbols">work</a>
		<a href="/blog" title="Blog" class="material-symbols">news</a>
	</nav>

	<a
		href="https://github.com/nathanblair"
		target="_blank"
		title="GitHub"
		class="display-inline-flex flex-justify-center flex-align-center"
	>
		<GitHub />
	</a>
	<a
		href="https://linkedin.com/in/engineerblair"
		target="_blank"
		title="LinkedIn"
		class=""
	>
		<LinkedIn />
	</a>
	<a href="mailto:me@nathanblair.rocks" title="E-Mail" class="material-symbols"
		>email</a
	>

	{#if $page.data.is_authenticated_route && !$page.data.session}
		<form method="POST" action="/login">
			<button type="submit" title="Log In" class="material-symbols"
				>login</button
			>
		</form>
	{:else if $page.data.is_authenticated_route && $page.data.session?.user}
		<form method="POST" action="/logout">
			<div id="user-info-container">
				<img
					class="icon-size"
					src={$page.data.session.user.image}
					alt="user"
					referrerpolicy="no-referrer"
				/>
				<div id="user-info">
					<span>{$page.data.session.user.name}</span>
					<span>{$page.data.session.user.email}</span>
				</div>
				<button type="submit" title="Log Out" class="material-symbols"
					>logout</button
				>
			</div>
		</form>
	{/if}
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

	#user-info-container {
		display: flex;
		justify-content: center;
	}

	#user-info {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}

	button {
		padding: 8px 12px;
		border: none;
		border-radius: 6px;
	}

	img {
		max-height: 40px;
		max-width: 48px;
	}
</style>
