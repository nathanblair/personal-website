<script>
	/** * @param {SubmitEvent} event */
	async function confirm_operation(event) {
		const op = event?.submitter?.innerHTML.toLocaleLowerCase()
		if (!confirm(`Are you sure you want to ${op} this blog post?`)) {
			event.preventDefault()
		}
	}

	/** @type {{title?: string, date?: string, content?: string, content_type?: string, operation: string}}*/
	let { title, date, content, content_type, operation } = $props()
</script>

<form method="post" onsubmit={confirm_operation}>
	<div id="create-header">
		<input
			class="input"
			type="text"
			id="title"
			name="title"
			required
			placeholder="Enter blog title here"
			value={title}
		/>
		<input
			class="input"
			type="date"
			name="date"
			id="date"
			value={date}
			required
		/>
		<select class="select" name="format" id="format" value={content_type}>
			<option value="text/markdown">Markdown</option>
			<option value="text/html">HTML</option>
			<option value="text/plain">Plain Text</option>
		</select>
	</div>
	<textarea
		class="textarea"
		name="content"
		id="content"
		placeholder="Enter blog content here"
		value={content}
		required
	></textarea>
	<div id="operations">
		<button
			class="btn preset-filled"
			id="cancel"
			formaction="?/cancel"
			type="submit"
			formnovalidate>Cancel</button
		>
		<button
			class="btn preset-filled"
			id="submit"
			formaction="?/{operation.toLocaleLowerCase()}"
			type="submit">{operation}</button
		>
	</div>
</form>
