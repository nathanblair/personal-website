<script>
	import LogIn from '@lucide/svelte/icons/log-in'
	import LogOut from '@lucide/svelte/icons/log-out'

	const { authStatus } = $props()
</script>

<button
	type="submit"
	title={authStatus ? 'Log Out' : 'Log In'}
	class="hover:text-slate-900 dark:text-slate-100 hover:dark:text-slate-500"
>
	{#if authStatus}
		<LogOut />
	{:else}
		<LogIn />
	{/if}
</button>
