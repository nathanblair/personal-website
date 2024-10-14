<script lang="ts">
	import { page } from '$app/stores'
	import { localStore } from '$lib/storage/local.svelte.js'

	import { Avatar } from '@skeletonlabs/skeleton-svelte'
	import { setContext } from 'svelte'

	import Resume from 'svelte-lucide/Building.svelte'
	import GitHub from 'svelte-lucide/Github.svelte'
	import Home from 'svelte-lucide/House.svelte'
	import LinkedIn from 'svelte-lucide/Linkedin.svelte'
	import LogIn from 'svelte-lucide/LogIn.svelte'
	import LogOut from 'svelte-lucide/LogOut.svelte'
	import Blog from 'svelte-lucide/Rss.svelte'
	import Mail from 'svelte-lucide/Send.svelte'
	import About from 'svelte-lucide/User.svelte'

	import DarkModeSwitch from './DarkModeSwitch.svelte'
	import NavTile from './NavTile.svelte'

	let dark_mode = localStore('dark_mode', true)

	$effect(() => {
		document.body.classList.toggle('dark', dark_mode.value)
	})

	setContext('iconCtx', { size: '18' })
</script>

<nav
	class="sticky top-0 z-10 flex justify-between overflow-x-scroll opacity-95 drop-shadow-md text-primary-800-200 bg-surface-100-900"
>
	<div class="ml-1 flex">
		<NavTile label="Home" href="/"><Home /></NavTile>
		<NavTile label="About" href="/about"><About /></NavTile>
		<NavTile label="Resumé" href="/resume"><Resume /></NavTile>
		<NavTile label="Blog" href="/blog"><Blog /></NavTile>
	</div>
	<div class="mr-1 flex items-center">
		<NavTile href="https://github.com/nathanblair" target="_blank"
			><GitHub size="24" /></NavTile
		>
		<NavTile href="https://linkedin.com/engineernblair" target="_blank"
			><LinkedIn size="24" /></NavTile
		>

		<NavTile href="mailto:me@nathanblair.rocks" target="_blank"
			><Mail /></NavTile
		>

		{#if $page.data.is_authenticated_route && !$page.data.session}
			<form method="POST" action="/login" class="flex items-center">
				<button
					type="submit"
					title="Log In"
					class="btn-icon hover:text-surface-contrast-50 dark:hover:text-surface-contrast-900"
				>
					<LogIn />
				</button>
			</form>
		{:else if $page.data.is_authenticated_route && $page.data.session?.user}
			<form method="POST" action="/logout" class="flex items-center">
				<Avatar
					size="size-10"
					rounded="rounded-full"
					border="mx-2"
					src={$page.data.session.user.image || undefined}
					name={''}
				/>
				<span class="pointer-events-none m-1 w-max text-surface-800-200"
					>{$page.data.session.user.name}</span
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

		<DarkModeSwitch />
	</div>
</nav>
