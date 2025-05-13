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
		<img
			class="mx-2 size-10 rounded-full border"
			src={session?.user?.image}
			alt={session?.user?.name}
		/>
		<span class="text-surface-800-200 pointer-events-none m-1 w-max"
			>{session?.user?.name}</span
		>
	{/if}
	<AuthButton {authStatus} />
</form>
