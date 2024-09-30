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
			type="text"
			id="title"
			name="title"
			required
			placeholder="Enter blog title here"
			value={title}
		/>
		<input type="date" name="date" id="date" value={date} required />
		<select name="format" id="format" value={content_type}>
			<option value="text/markdown">Markdown</option>
			<option value="text/html">HTML</option>
			<option value="text/plain">Plain Text</option>
		</select>
	</div>
	<textarea
		name="content"
		id="content"
		placeholder="Enter blog content here"
		value={content}
		required
	></textarea>
	<div id="operations">
		<button id="cancel" formaction="?/cancel" type="submit" formnovalidate
			>Cancel</button
		>
		<button
			id="submit"
			formaction="?/{operation.toLocaleLowerCase()}"
			type="submit">{operation}</button
		>
	</div>
</form>

<style>
	form {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	#create-header {
		display: flex;
		justify-content: space-between;
	}

	#title {
		text-align: center;
		flex: 1;
	}

	#content {
		flex: 1;
	}

	#operations {
		display: flex;
	}

	button {
		border: solid 1px var(--text-foreground);
	}

	input,
	textarea {
		padding: 1rem;
		font: inherit;
		resize: none;
	}

	#submit {
		flex: 2;
	}
	#cancel {
		flex: 1;
	}
</style>
