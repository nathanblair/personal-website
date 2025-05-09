<script lang="ts">
	import { localStore } from '$lib/storage/local.svelte'

	import Resume from '@lucide/svelte/icons/building-2'
	import GitHub from '@lucide/svelte/icons/github'
	import Home from '@lucide/svelte/icons/house'
	import LinkedIn from '@lucide/svelte/icons/linkedin'
	import LogIn from '@lucide/svelte/icons/log-in'
	import LogOut from '@lucide/svelte/icons/log-out'
	import Blog from '@lucide/svelte/icons/rss'
	import Mail from '@lucide/svelte/icons/send'
	import Admin from '@lucide/svelte/icons/shield-ellipsis'
	import About from '@lucide/svelte/icons/user'
	import NavTile from './NavTile.svelte'

	import type { Session } from '$lib/types'

	let dark_mode = localStore('dark_mode', true)

	let { session }: { session?: Session | null } = $props()

	$effect(() => {
		document.body.classList.toggle('dark', dark_mode.value)
	})
</script>

<nav
	class="text-primary-800-200 bg-surface-100-900 sticky top-0 z-10 flex justify-between overflow-x-scroll opacity-95 drop-shadow-md"
>
	<div class="mr-3 ml-1 flex">
		<NavTile label="Home" href="/"><Home class="icon" /></NavTile>
		<NavTile label="About" href="/about"><About class="icon" /></NavTile>
		<NavTile label="Resumé" href="/resume"><Resume /></NavTile>
		<NavTile label="Blog" href="/blog"><Blog /></NavTile>
		{#if !session}
			<form method="POST" action="/login" class="flex items-center">
				<button
					type="submit"
					title="Log In"
					class="btn-icon hover:text-surface-contrast-50 dark:hover:text-surface-contrast-900"
				>
					<LogIn />
				</button>
			</form>
		{:else if session.user}
			{#if session.user.admin}
				<NavTile label="Admin" href="/admin"><Admin /></NavTile>
			{/if}

			<form method="POST" action="/logout" class="flex items-center">
				<img
					class="mx-2 size-10 rounded-full border"
					src={session.user.image}
					alt={session.user.name}
				/>
				<span class="text-surface-800-200 pointer-events-none m-1 w-max"
					>{session.user.name}</span
				>
				<button
					type="submit"
					title="Log Out"
					class="btn-icon hover:text-surface-contrast-50 dark:hover:text-surface-contrast-900"
				>
					<LogOut />
				</button>
			</form>
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

		<!-- <DarkModeSwitch /> -->
	</div>
</nav>
