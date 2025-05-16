<script lang="ts">
	import CommentComponent from '$lib/components/Comment.svelte'
	import type { Comment } from '$lib/types/comment.ts'
	import type { CommentsRockedState } from '$lib/types/rock.ts'

	let {
		comments,
		rocks,
		locale,
		timeZone,
		userId,
		admin = false,
	}: {
		comments: Comment[]
		rocks: CommentsRockedState
		locale: string
		timeZone: string
		userId?: number
		admin?: boolean
	} = $props()
</script>

{#each comments as comment, index (comment.id)}
	<CommentComponent
		{comment}
		{index}
		{locale}
		{timeZone}
		readonly={userId !== comment.userId || !admin}
		rocked={rocks[comment.id].rocked}
		rockCount={rocks[comment.id].count}
	/>
{/each}
