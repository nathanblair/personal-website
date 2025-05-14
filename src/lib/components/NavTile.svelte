<script lang="ts">
	let {
		label,
		href,
		target = '',
		title,
		children,
	}: {
		label?: string
		href: string
		target?: string
		title?: string
		children: any
	} = $props()
</script>

<a
	id="0"
	{href}
	{target}
	title={title || label}
	class="flex flex-col items-center p-2 hover:text-slate-400 dark:text-slate-100 hover:dark:text-slate-500"
>
	{#if children}
		{@render children()}
	{/if}
	{#if label}
		<span>{label}</span>
	{/if}
</a>
