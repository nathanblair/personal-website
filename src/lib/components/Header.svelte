<script lang="ts">
	import Resume from '@lucide/svelte/icons/building-2'
	import GitHub from '@lucide/svelte/icons/github'
	import Home from '@lucide/svelte/icons/house'
	import LinkedIn from '@lucide/svelte/icons/linkedin'
	import Blog from '@lucide/svelte/icons/rss'
	import Mail from '@lucide/svelte/icons/send'
	import Admin from '@lucide/svelte/icons/shield-ellipsis'
	import About from '@lucide/svelte/icons/user'

	import AuthForm from './AuthForm.svelte'
	import NavTile from './NavTile.svelte'

	import type { Session } from '$lib/types/auth'

	let { session }: { session?: Session | null } = $props()
</script>

<nav
	class="text-primary-800 dark:text-primary-200 sticky top-0 z-10 flex justify-between overflow-x-scroll bg-slate-100 opacity-95 drop-shadow-md dark:bg-slate-900"
>
	<div class="mr-3 ml-1 flex">
		<NavTile label="Home" href="/"><Home /></NavTile>
		<NavTile label="About" href="/about"><About /></NavTile>
		<NavTile label="Resumé" href="/resume"><Resume /></NavTile>
		<NavTile label="Blog" href="/blog"><Blog /></NavTile>
		{#if !session}
			<AuthForm authStatus={false} {session} />
		{:else if session.user}
			{#if session.user.admin}
				<NavTile label="Admin" href="/admin"><Admin /></NavTile>
			{/if}
			<AuthForm authStatus={true} {session} />
		{/if}
	</div>
	<div class="mr-1 ml-3 flex items-center">
		<NavTile href="https://github.com/nathanblair" target="_blank"
			><GitHub /></NavTile
		>
		<NavTile href="https://linkedin.com/engineernblair" target="_blank"
			><LinkedIn /></NavTile
		>

		<NavTile href="mailto:me@nathanblair.rocks" target="_blank"
			><Mail /></NavTile
		>
	</div>
</nav>
