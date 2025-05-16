<script lang="ts">
	import { slide } from 'svelte/transition'

	import { formatDisplayDateTime } from '$lib/datetime.ts'
	import type { BlogSlug } from '$lib/types/blog.ts'

	let {
		blogSlugs,
		locale,
		timeZone,
	}: { blogSlugs: BlogSlug[]; locale: string; timeZone: string } = $props()

	const sorted = blogSlugs.sort(
		(
			a: { date: string | number | Date },
			b: { date: string | number | Date },
		) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	)
</script>

{#each sorted as blog, index}
	<a
		in:slide|global={{ duration: 200, delay: index * 50 }}
		class="block rounded-md border-slate-100 bg-slate-100 p-6 text-slate-900 drop-shadow-md dark:bg-slate-900 dark:text-slate-100"
		href={`/blog/${blog.slug}`}
	>
		<h1 class="text-xl font-bold">{blog.title}</h1>
		<h2 class="text-slate-500">
			{formatDisplayDateTime(blog.date, locale, timeZone)}
		</h2>
	</a>
{/each}
