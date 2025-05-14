<script lang="ts">
	import { enhance } from '$app/forms'

	let {
		slug,
		locale,
		timeZone,
	}: { slug: string; locale: string; timeZone: string } = $props()
</script>

<form method="POST" use:enhance class="">
	<input type="hidden" name="locale" value={locale} />
	<input type="hidden" name="timeZone" value={timeZone} />

	<textarea
		class="w-full resize-none bg-slate-100 p-2 dark:bg-slate-900"
		name="content"
		id="content"
		required
		rows="4"
		placeholder="Enter a comment"
	></textarea>
	<button
		type="submit"
		class="my-3 w-full lg:w-auto"
		formaction="/comment/{slug}?/submit">Submit</button
	>
</form>
