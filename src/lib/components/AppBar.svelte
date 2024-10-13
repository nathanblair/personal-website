<script lang="ts">
	import { page } from '$app/stores'
	import { localStore } from '$lib/storage/local.svelte.js'

	import { AppBar, Avatar, Switch } from '@skeletonlabs/skeleton-svelte'
	import { setContext } from 'svelte'

	import Resume from 'svelte-lucide/Building.svelte'
	import GitHub from 'svelte-lucide/Github.svelte'
	import Home from 'svelte-lucide/House.svelte'
	import LinkedIn from 'svelte-lucide/Linkedin.svelte'
	import LogIn from 'svelte-lucide/LogIn.svelte'
	import LogOut from 'svelte-lucide/LogOut.svelte'
	import Moon from 'svelte-lucide/Moon.svelte'
	import Blog from 'svelte-lucide/Rss.svelte'
	import Mail from 'svelte-lucide/Send.svelte'
	import Sun from 'svelte-lucide/Sun.svelte'
	import About from 'svelte-lucide/User.svelte'

	let dark_mode = localStore('dark_mode', true)
	const link_classes =
		'btn-icon size-10 hover:text-primary-contrast-100 dark:hover:text-primary-contrast-900'

	$effect(() => {
		document.body.classList.toggle('dark', dark_mode.value)
	})

	setContext('iconCtx', { size: '40' })
</script>

<AppBar
	classes="sticky top-0 z-10 opacity-95 text-primary-800-200"
	shadow="drop-shadow-md"
	base="overflow-y-scroll"
	padding="p-2"
>
	{#snippet lead()}
		<a href="/" title="Home" class={link_classes}><Home /></a>
		<!-- <Menu class="sm:hidden" /> -->
		<a href="/about" title="About" class={link_classes}><About /></a>
		<a href="/resume" title="Resumé" class={link_classes}><Resume /></a>
		<a href="/blog" title="Blog" class={link_classes}><Blog /></a>
	{/snippet}
	{#snippet trail()}
		<div class="flex space-x-4">
			<a
				href="https://github.com/nathanblair"
				target="_blank"
				title="GitHub"
				class={link_classes}
			>
				<GitHub />
			</a>
			<a
				href="https://linkedin.com/in/engineerblair"
				target="_blank"
				title="LinkedIn"
				class={link_classes}
			>
				<LinkedIn />
			</a>
			<a href="mailto:me@nathanblair.rocks" title="E-Mail" class={link_classes}>
				<Mail />
			</a>
		</div>
		{#if $page.data.is_authenticated_route && !$page.data.session}
			<form method="POST" action="/login" class="flex items-center">
				<button type="submit" title="Log In" class={link_classes}>
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
				<button type="submit" title="Log Out" class={link_classes}>
					<LogOut />
				</button>
			</form>
		{/if}
		<Switch name="dark_mode" bind:checked={dark_mode.value}>
			{#snippet inactiveChild()}<Sun size="14" />{/snippet}
			{#snippet activeChild()}<Moon size="14" />{/snippet}
		</Switch>
	{/snippet}
</AppBar>
