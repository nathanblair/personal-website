<script lang="ts">
	import { enhance } from '$app/forms'
	import Comment from '$lib/components/Comment.svelte'
	import { comments_table_name } from '$lib/constants'
	// import commonmark from 'commonmark'
	import Comments from '@lucide/svelte/icons/message-square'
	import CommentsOff from '@lucide/svelte/icons/message-square-off'

	import { page } from '$app/state'

	let {
		slug,
		title,
		date,
		content,
		content_type,
		comments_enabled,
	}: {
		slug: string
		title?: string
		date: string
		content: string
		content_type: string
		comments_enabled?: boolean
	} = $props()

	const locale = Intl.DateTimeFormat().resolvedOptions().locale
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	let node_type = $state(content_type)

	// const reader = commonmark.Parser()
	// const html_writer = commonmark.HtmlRenderer()
	// let rendered = $derived(
	// 	node_type === 'text/markdown'
	// 		? html_writer.render(reader.parse(content))
	// 		: content,
	// )

	const readonly = !page.data.session?.user?.admin

	let editing = $state(true)

	let display_date = $derived(
		new Date(date).toLocaleString(locale, {
			dateStyle: 'full',
			timeStyle: 'long',
			timeZone,
		}),
	)

	$inspect(date, display_date, comments_enabled, readonly)

	async function comments() {
		const comments_request = await fetch(`/api/${comments_table_name}/${slug}`)
		return await comments_request.json()
	}
</script>

{#snippet comment_placeholder()}
	<div class="w-full space-y-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-center space-x-4">
				<div class="placeholder-circle size-16 animate-pulse"></div>
				<div class="placeholder-circle size-14 animate-pulse"></div>
				<div class="placeholder-circle size-10 animate-pulse"></div>
			</div>
		</div>
		<div class="space-y-4">
			<div class="placeholder animate-pulse"></div>
			<div class="grid grid-cols-4 gap-4">
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
				<div class="placeholder animate-pulse"></div>
			</div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
		</div>
	</div>
{/snippet}

<header class="my-4 text-center sm:mx-44 sm:my-0">
	<input
		class="input my-2 w-full text-center text-2xl disabled:!cursor-text disabled:!opacity-100 disabled:ring-0"
		type="text"
		placeholder="Enter blog title here"
		value={title}
		name="title"
		required
		disabled={readonly}
		tabindex={readonly ? -1 : 0}
	/>

	<h2 class="text-surface-500 flex-1 text-xl">{display_date}</h2>
	{#if !readonly}
		<div class="my-2 flex items-center justify-center">
			<select
				class="select w-auto"
				class:pointer-events-none={readonly}
				value={content_type}
				required
			>
				<option value="text/markdown">Markdown</option>
				<option value="text/html">HTML</option>
				<option value="text/plain">Plain Text</option>
			</select>

			<div class="flex items-center">
				<input
					type="checkbox"
					id="comments"
					name="comments_enabled"
					class="peer checkbox sr-only"
					tabindex="0"
					value={comments_enabled}
					bind:checked={comments_enabled}
				/>
				<label
					for="comments"
					class:pointer-events-none={readonly}
					class="btn-icon label label-text peer-focus-within:ring-primary-500 inline-block cursor-pointer peer-focus-within:ring-1"
				>
					{#if comments_enabled}
						<Comments />
					{:else}
						<CommentsOff />
					{/if}
				</label>
			</div>
		</div>
	{/if}
</header>

<!-- <textarea
class="textarea w-full resize-none overflow-y-scroll"
class:ring-0={readonly}
placeholder="Enter blog content here"
onfocusout={() => (editing = false)}
value={content}
rows="10"
></textarea> -->

{#if !editing}
	<div
		class="markdown-body form-textarea textarea !bg-surface-100 !text-surface-900 dark:!bg-surface-900 dark:!text-surface-100 !mx-12 !my-12 min-h-24 w-auto overflow-x-scroll"
		class:ring-0={readonly}
		contenteditable={!readonly}
	>
		<!-- {@html rendered} -->
	</div>

	<form method="POST" use:enhance class="mx-4 my-1 sm:mx-36">
		<textarea
			class="form-textarea textarea resize-none"
			name="comment"
			id="comment"
			required
			rows="4"
			placeholder="Enter a comment"
		></textarea>
		<button
			type="submit"
			class="btn preset-tonal-primary my-3 w-full lg:w-auto"
			formaction="/comment/{slug}?/submit&locale={locale}&timeZone={timeZone}"
			>Submit</button
		>
	</form>

	{#if comments_enabled}
		{#await comments()}
			{#each Array(5) as _}{@render comment_placeholder()}{/each}
		{:then comments}
			{#each comments as comment, index}
				<Comment {comment} {index} />
			{/each}
		{/await}
	{/if}
{/if}
