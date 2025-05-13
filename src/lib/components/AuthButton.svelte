<script>
	import LogIn from '@lucide/svelte/icons/log-in'
	import LogOut from '@lucide/svelte/icons/log-out'

	const { authStatus } = $props()
</script>

<button
	type="submit"
	title={authStatus ? 'Log Out' : 'Log In'}
	class="hover:text-surface-contrast-50 dark:hover:text-surface-contrast-900"
>
	{#if authStatus}
		<LogOut />
	{:else}
		<LogIn />
	{/if}
</button>
