<script lang="ts">
	import type { Session } from '$lib/types/auth'

	import AuthButton from './AuthButton.svelte'

	const {
		authStatus,
		session,
	}: { authStatus: boolean; session?: Session | null } = $props()
</script>

<form
	method="POST"
	action={authStatus ? '/logout' : '/login'}
	class="flex items-center"
>
	{#if authStatus}
		<!-- src={session?.user?.image} -->
		<img class="mx-2 size-10 rounded-full border" alt={session?.user?.name} />
		<span
			class="pointer-events-none m-1 w-max text-slate-800 dark:text-slate-200"
			>{session?.user?.name}</span
		>
	{/if}
	<AuthButton {authStatus} />
</form>
