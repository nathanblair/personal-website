<script>
	import { enhance } from '$app/forms'

	let { form, data } = $props()
</script>

<form method="POST" use:enhance class="m-2">
	{#await data.initialized then initialized}
		{#if initialized}
			<p>Initialized</p>
		{:else}
			<button class="btn m-2 preset-tonal" formaction="?/init-test-slug"
				>Initialize Test Slug</button
			>
		{/if}
	{/await}
	<button class="btn m-2 preset-tonal" formaction="?/clean-test-slug"
		>Clean Test Slug</button
	>

	<textarea
		class="form-textarea textarea"
		name="comment"
		id="comment"
		required
		placeholder="Enter a comment"
	></textarea>
	<button
		type="submit"
		class="btn m-2 preset-tonal-primary"
		formaction="?/submit">Submit</button
	>

	<button class="btn m-2 preset-tonal" formaction="?/test-comments"
		>Test Comments</button
	>

	{#if form?.success}
		<pre>{JSON.stringify(form.results)}</pre>
	{/if}
</form>

<style>
</style>
