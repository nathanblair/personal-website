<script lang="ts">
	import { enhance } from '$app/forms'

	let {
		slug,
		locale,
		timeZone,
	}: { slug: string; locale: string; timeZone: string } = $props()
</script>

<form method="POST" use:enhance class="mx-4 my-1 sm:mx-36">
	<input type="hidden" name="locale" value={locale} />
	<input type="hidden" name="timeZone" value={timeZone} />

	<textarea
		class="textarea bg-surface-100-900 placeholder:text-surface-300 resize-none pt-2"
		name="content"
		id="content"
		required
		rows="4"
		placeholder="Enter a comment"
	></textarea>
	<button
		type="submit"
		class="btn preset-tonal-primary my-3 w-full lg:w-auto"
		formaction="/comment/{slug}?/submit">Submit</button
	>
</form>
