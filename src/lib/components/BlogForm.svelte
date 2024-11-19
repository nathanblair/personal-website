<script>
	import Comments from 'lucide-svelte/icons/message-square'
	import CommentsOff from 'lucide-svelte/icons/message-square-off'

	/** * @param {SubmitEvent} event */
	async function confirm_operation(event) {
		const op = event?.submitter?.innerHTML.toLocaleLowerCase()
		if (!confirm(`Are you sure you want to ${op} this blog post?`)) {
			event.preventDefault()
		}
	}

	// FIXME comments_enabled needs to be bound to the state of comments
	/** @type {{
	 * title?: string,
	 * date?: string,
	 * content?: string,
	 * content_type?: string,
	 * comments_enabled?: boolean,
	 * operation: string
	 * }}*/
	let { title, date, content, content_type, comments_enabled, operation } =
		$props()

	let comments = $state(comments_enabled)
</script>

<form method="post" onsubmit={confirm_operation} class="flex flex-1 flex-col">
	<input
		class="input m-2 w-auto"
		type="text"
		id="title"
		name="title"
		required
		placeholder="Enter blog title here"
		value={title}
	/>
	<div class="m-2 flex">
		<input
			class="input"
			type="date"
			name="date"
			id="date"
			value={date}
			required
		/>
		<select
			class="select w-auto"
			name="format"
			id="format"
			value={content_type}
		>
			<option value="text/markdown">Markdown</option>
			<option value="text/html">HTML</option>
			<option value="text/plain">Plain Text</option>
		</select>
		<div class="flex items-center">
			<input
				type="checkbox"
				id="comments"
				name="comments"
				class="peer checkbox sr-only"
				tabindex="0"
				value={comments}
				bind:checked={comments}
			/>
			<label
				for="comments"
				class="btn-icon label inline-block cursor-pointer peer-focus-within:ring-1 peer-focus-within:ring-primary-500"
			>
				{#if comments}
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
		value={content}
		rows="10"
		required
	></textarea>
	<div class="mx-2 flex">
		<button
			class="btn my-2 mr-1 flex-1 rounded-md preset-filled"
			id="cancel"
			formaction="?/cancel"
			type="submit"
			formnovalidate>Cancel</button
		>
		<button
			class="btn my-2 ml-1 flex-1 rounded-md preset-filled-primary-700-300"
			id="submit"
			formaction="?/{operation.toLocaleLowerCase()}"
			type="submit">{operation}</button
		>
	</div>
</form>
