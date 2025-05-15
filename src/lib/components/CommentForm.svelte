<script lang="ts">
	import { enhance } from '$app/forms'

	let { locale, timeZone }: { locale: string; timeZone: string } = $props()
</script>

<form method="POST" use:enhance class="mt-4">
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

	<button class="btn my-3 lg:w-auto" formaction="?/addComment">Submit</button>
</form>
