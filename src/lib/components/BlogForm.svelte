<script lang="ts">
	// import { Combobox } from '@skeletonlabs/skeleton-svelte'

	import Comments from '@lucide/svelte/icons/message-square'
	import CommentsOff from '@lucide/svelte/icons/message-square-off'

	import { locale, timeZone } from '$lib/datetime'

	interface Format {
		value: string
		label: string
	}

	let commentsEnabled = $state(true)

	let formats: Format[] = [
		{ value: 'text/markdown', label: 'Markdown' },
		{ value: 'text/html', label: 'HTML' },
		{ value: 'text/plain', label: 'Plain Text' },
	]

	let selectedFormat = $state([formats[0].value])
</script>

<form method="POST" class="group flex flex-1 flex-col">
	<input type="hidden" name="locale" value={locale} />
	<input type="hidden" name="timeZone" value={timeZone} />

	<div class="m-2 flex space-x-2">
		<input
			class="flex-1 p-2 outline-1"
			type="text"
			id="title"
			name="title"
			required
			placeholder="Enter blog title here"
		/>

		<select name="contentType" id="contentType">
			{#each formats as format}
				<option value={format.value} selected={true}>{format.label}</option>
			{/each}
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
				class="peer-focus-within:ring-primary-500 cursor-pointer peer-focus-within:ring-1"
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
		class="m-2 w-auto flex-1 resize-none overflow-y-scroll"
		name="content"
		id="content"
		placeholder="Enter blog content here"
		rows="10"
		required
	></textarea>

	<div class="m-2 flex space-x-2">
		<button class="btn flex-1 rounded-md" formaction="?/cancel" formnovalidate
			>Cancel</button
		>
		<button
			class="btn flex-1 rounded-md group-has-invalid:pointer-events-none group-has-invalid:opacity-50"
			id="submit"
			formaction="?/create">Create</button
		>
	</div>
</form>
