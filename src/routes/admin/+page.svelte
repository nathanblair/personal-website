<script lang="ts">
	import { comments_table_name, rocks_table_name } from '$lib/constants.js'
	import { onMount } from 'svelte'

	let comments_initialized = $state(false)
	let rocks_initialized = $state(false)
	// $inspect(comments_initialized, rocks_initialized)

	onMount(() => {
		comments()
		rocks()
	})

	async function comments(method: 'GET' | 'DELETE' | 'PUT' = 'GET') {
		const uri = new URL(`/api/${comments_table_name}`, window.location.origin)
		const r = await fetch(uri, { method })
		comments_initialized = await r.json()
		console.log('Comments:', comments_initialized)
	}

	async function rocks(method: 'GET' | 'DELETE' | 'PUT' = 'GET') {
		const uri = new URL(`/api/${rocks_table_name}`, window.location.origin)
		const r = await fetch(uri, { method })
		rocks_initialized = await r.json()
		console.log('Rocks:', rocks_initialized)
	}
</script>

<button
	class="btn my-2 w-full preset-tonal lg:w-auto"
	onclick={() => comments(comments_initialized ? 'DELETE' : 'PUT')}
>
	{comments_initialized
		? 'Remove Comments Table'
		: 'Initialize Comments'}</button
>
<button
	class="btn my-2 w-full preset-tonal lg:w-auto"
	onclick={() => rocks(rocks_initialized ? 'DELETE' : 'PUT')}
	>{rocks_initialized ? 'Remove Rocks Table' : 'Initialize Rocks'}</button
>
