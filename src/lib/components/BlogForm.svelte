<script lang="ts">
	import Comments from '@lucide/svelte/icons/message-square'
	import CommentsOff from '@lucide/svelte/icons/message-square-off'

	import { locale, timeZone } from '$lib/datatime.ts'

	let commentsEnabled = $state(false)
</script>

<form method="POST" class="flex flex-1 flex-col">
	<input type="hidden" name="locale" value={locale} />
	<input type="hidden" name="timeZone" value={timeZone} />

	<div class="m-2 flex">
		<input
			class="input w-auto flex-1"
			type="text"
			id="title"
			name="title"
			required
			placeholder="Enter blog title here"
		/>

		<!-- <input
			class="input"
			type="date"
			name="date"
			id="date"
			required
			value={new Date().toISOString().split('T')[0]}
		/> -->

		<select class="select ml-2 w-auto" name="format" id="format">
			<option value="text/markdown">Markdown</option>
			<option value="text/html">HTML</option>
			<option value="text/plain">Plain Text</option>
		</select>

		<div class="flex items-center">
			<input
				class="peer checkbox sr-only"
				type="checkbox"
				id="commentsEnabled"
				name="commentsEnabled"
				tabindex="0"
				value={commentsEnabled}
				bind:checked={commentsEnabled}
			/>
			<label
				class="peer-focus-within:ring-primary-500 cursor-pointer p-2 peer-focus-within:ring-1"
				for="commentsEnabled"
			>
				{#if commentsEnabled}
					<Comments />
				{:else}
					<CommentsOff />
				{/if}
			</label>
		</div>
	</div>

	<textarea
		class="textarea m-2 w-auto flex-1 resize-none overflow-y-scroll"
		name="content"
		id="content"
		placeholder="Enter blog content here"
		rows="10"
		required
	></textarea>
	<div class="mx-2 flex">
		<button
			class="btn preset-filled my-2 mr-1 flex-1 rounded-md"
			id="cancel"
			formaction="?/cancel"
			type="submit"
			formnovalidate>Cancel</button
		>
		<button
			class="btn preset-filled-primary invalid:preset-filled-error-400-600 my-2 ml-1 flex-1 rounded-md invalid:cursor-not-allowed"
			id="submit"
			formaction="?/create"
			type="submit">Create</button
		>
	</div>
</form>
