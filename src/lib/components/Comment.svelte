<script>
	import { Heart } from 'lucide-svelte'
	import { slide } from 'svelte/transition'

	/** @type {{comment: import('$lib/server/comments/api.js').Comment, index: number, date: Date, admin: boolean}}*/
	let { comment, date, index, admin } = $props()
</script>

<div
	in:slide|global={{ duration: 100, delay: index * 100 }}
	class="card m-2 border p-2 drop-shadow-md bg-surface-100-900"
	data-id={comment.id}
	data-user-id={comment.user_id}
	data-user-email={comment.user_email}
>
	<div class="flex items-center">
		<img
			class="mr-2 size-10 rounded-full border"
			src={comment.user_image}
			alt="User Avatar"
		/>
		<div class="flex flex-col">
			<div>
				<span>{date.toDateString()}</span>
				<span
					>{date.toLocaleTimeString(undefined, { timeZoneName: 'short' })}</span
				>
			</div>
			<span>{comment.user_name}</span>
		</div>
	</div>
	<span>{comment.body}</span>
	<div class="flex justify-end">
		<button class="badge btn mx-2 preset-filled-tertiary-50-950">
			<Heart size={16} />
			<span class="">{comment.rocks}</span>
		</button>
		{#if admin}
			<button class="btn preset-filled-tertiary-500">Delete</button>
		{/if}
	</div>
</div>
