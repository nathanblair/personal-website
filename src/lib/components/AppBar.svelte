<script lang="ts">
	import { page } from '$app/stores'
	import { localStore } from '$lib/storage/local.svelte.js'

	import { AppBar, Avatar, Nav } from '@skeletonlabs/skeleton-svelte'
	import { setContext } from 'svelte'

	import GitHub from 'svelte-lucide/Github.svelte'
	import Home from 'svelte-lucide/House.svelte'
	import LogIn from 'svelte-lucide/LogIn.svelte'
	import LogOut from 'svelte-lucide/LogOut.svelte'
	import {
		default as Blog,
		default as Mail,
		default as Resume
	} from 'svelte-lucide/Mail.svelte'
	import About from 'svelte-lucide/User.svelte'

	let dark_mode = localStore('dark_mode', true)

	$effect(() => {
		document.body.classList.toggle('dark', dark_mode.value)
	})

	setContext('iconCtx', { size: '18' })
</script>

<AppBar
	classes="sticky top-0 z-10 opacity-95"
	shadow="drop-shadow-md"
	base="overflow-y-scroll"
>
	{#snippet lead()}
		<Nav.Tile label="Home" href="/"><Home /></Nav.Tile>
		<Nav.Tile label="About" href="/about"><About /></Nav.Tile>
		<Nav.Tile label="Resumé" href="/resume"><Resume /></Nav.Tile>
		<Nav.Tile label="Blog" href="/blog"><Blog /></Nav.Tile>
	{/snippet}
	{#snippet trail()}
		<Nav.Tile
			rounded="rounded-lg"
			label="GitHub"
			href="https://github.com/nathanblair"
			target="_blank"><GitHub /></Nav.Tile
		>
		<!-- <Nav.Tile -->
		<!-- rounded="rounded-lg" -->
		<!-- label="LinkedIn" -->
		<!-- href="https://linkedin.com/in/engineerblair" -->
		<!-- target="_blank"><LinkedIn /></Nav.Tile -->
		<!-- > -->
		<Nav.Tile
			rounded="rounded-lg"
			label="Email"
			href="mailto:me@nathanblair.rocks"
			target="_blank"><Mail /></Nav.Tile
		>
		{#if $page.data.is_authenticated_route && !$page.data.session}
			<form method="POST" action="/login" class="flex items-center">
				<button type="submit" title="Log In" class="">
					<LogIn />
				</button>
			</form>
		{:else if $page.data.is_authenticated_route && $page.data.session?.user}
			<form method="POST" action="/logout" class="flex items-center space-x-4">
				<Avatar
					size="size-10"
					rounded="rounded-full"
					src={$page.data.session.user.image || undefined}
					name={''}
				/>
				<span class="pointer-events-none text-surface-800-200"
					>{$page.data.session.user.name}</span
				>
				<button type="submit" title="Log Out" class="">
					<LogOut />
				</button>
			</form>
		{/if}
		<!-- <Switch name="dark_mode" bind:checked={dark_mode.value}> -->
		<!-- {#snippet inactiveChild()}<Sun size="14" />{/snippet} -->
		<!-- {#snippet activeChild()}<Moon size="14" />{/snippet} -->
		<!-- </Switch> -->
	{/snippet}
</AppBar>
