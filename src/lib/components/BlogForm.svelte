<script lang="ts">
	import { enhance } from '$app/forms'

	import Comments from '@lucide/svelte/icons/message-square'
	import CommentsOff from '@lucide/svelte/icons/message-square-off'

	import { locale, timeZone } from '$lib/datetime'
	import { ContentType } from '$lib/types/content.ts'

	let {
		title = '',
		content = '',
		date,
		commentsEnabled = true,
		contentType = ContentType.Markdown,
	}: {
		title?: string
		content?: string
		date?: string
		commentsEnabled?: boolean
		contentType?: ContentType
	} = $props()

	let commentsEnabledState = $state(commentsEnabled)

	let formats: {
		value: ContentType
		label: keyof typeof ContentType
	}[] = [
		{ value: ContentType.Markdown, label: 'Markdown' },
		{ value: ContentType.HTML, label: 'HTML' },
		{ value: ContentType.PlainText, label: 'PlainText' },
	]
</script>

<form use:enhance method="POST" class="group flex flex-1 flex-col space-y-2">
	<input type="hidden" name="locale" value={locale} />
	<input type="hidden" name="timeZone" value={timeZone} />
	<input type="hidden" name="date" value={date} />

	<div class="flex space-x-2">
		<input
			class="flex-1 p-2 outline-1"
			type="text"
			name="title"
			required
			placeholder="Enter blog title here"
			value={title}
		/>

		<select
			name="contentType"
			id="contentType"
			class="appearance-none p-1 outline-1"
		>
			{#each formats as format}
				<option value={format.value} selected={format.value === contentType}
					>{format.label}</option
				>
			{/each}
		</select>

		<div class="flex items-center">
			<input
				class="peer checkbox sr-only"
				type="checkbox"
				name="commentsEnabled"
				tabindex="0"
				value={commentsEnabledState}
				bind:checked={commentsEnabledState}
			/>

			<label
				class="peer-focus-within:ring-primary-500 cursor-pointer peer-focus-within:ring-1"
				for="commentsEnabled"
			>
				{#if commentsEnabledState}
					<Comments />
				{:else}
					<CommentsOff />
				{/if}
			</label>
		</div>
	</div>

	<textarea
		class="w-auto flex-1 resize-none overflow-y-scroll"
		name="content"
		id="content"
		placeholder="Enter blog content here"
		rows="10"
		required
		value={content}
	></textarea>

	<div class="mb-3 flex space-x-2">
		<a
			class="btn flex flex-1 items-center justify-center rounded-md text-center"
			href="/blog">Cancel</a
		>
		<button
			class="btn flex-1 rounded-md group-has-invalid:pointer-events-none group-has-invalid:opacity-50"
			id="submit">Submit</button
		>
	</div>
</form>
