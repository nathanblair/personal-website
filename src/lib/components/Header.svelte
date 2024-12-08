<script lang="ts">
	import { localStore } from '$lib/storage/local.svelte'

	import Resume from 'lucide-svelte/icons/building-2'
	import Home from 'lucide-svelte/icons/house'
	import LogIn from 'lucide-svelte/icons/log-in'
	import LogOut from 'lucide-svelte/icons/log-out'
	import Blog from 'lucide-svelte/icons/rss'
	import Mail from 'lucide-svelte/icons/send'
	import Admin from 'lucide-svelte/icons/shield-ellipsis'
	import About from 'lucide-svelte/icons/user'
	import GitHub from 'svelte-lucide/Github.svelte'
	import LinkedIn from 'svelte-lucide/Linkedin.svelte'
	import DarkModeSwitch from './DarkModeSwitch.svelte'
	import NavTile from './NavTile.svelte'

	import type { Session } from '$lib/types'

	let dark_mode = localStore('dark_mode', true)

	let { session }: { session?: Promise<Session | null> } = $props()

	$effect(() => {
		document.body.classList.toggle('dark', dark_mode.value)
	})
</script>

<nav
	class="sticky top-0 z-10 flex justify-between overflow-x-scroll opacity-95 drop-shadow-md text-primary-800-200 bg-surface-100-900"
>
	<div class="ml-1 mr-3 flex">
		<NavTile label="Home" href="/"><Home /></NavTile>
		<NavTile label="About" href="/about"><About /></NavTile>
		<NavTile label="Resumé" href="/resume"><Resume /></NavTile>
		<NavTile label="Blog" href="/blog"><Blog /></NavTile>
		{#await session then s}
			{#if !s}
				<form method="POST" action="/login" class="flex items-center">
					<button
						type="submit"
						title="Log In"
						class="btn-icon hover:text-surface-contrast-50 dark:hover:text-surface-contrast-900"
					>
						<LogIn />
					</button>
				</form>
			{:else if s.user}
				{#if s.user.admin}
					<NavTile label="Admin" href="/admin"><Admin /></NavTile>
				{/if}

				<form method="POST" action="/logout" class="flex items-center">
					<img
						class="mx-2 size-10 rounded-full border"
						src={s.user.image}
						alt={s.user.name}
					/>
					<span class="pointer-events-none m-1 w-max text-surface-800-200"
						>{s.user.name}</span
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
		{/await}
	</div>
	<div class="ml-3 mr-1 flex items-center">
		<NavTile href="https://github.com/nathanblair" target="_blank"
			><GitHub size="24" /></NavTile
		>
		<NavTile href="https://linkedin.com/engineernblair" target="_blank"
			><LinkedIn size="24" /></NavTile
		>

		<NavTile href="mailto:me@nathanblair.rocks" target="_blank"
			><Mail /></NavTile
		>

		<DarkModeSwitch />
	</div>
</nav>
