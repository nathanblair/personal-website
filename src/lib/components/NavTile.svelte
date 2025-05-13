<script lang="ts">
	let {
		label,
		href,
		target = '',
		tooltip,
		children,
	}: {
		label?: string
		href: string
		target?: string
		tooltip?: string
		children: any
	} = $props()
</script>

<a
	id="0"
	{href}
	{target}
	title={tooltip || label}
	class="hover:text-surface-contrast-100-900 flex flex-col items-center p-2"
>
	{#if children}
		{@render children()}
	{/if}
	{#if label}
		<span>{label}</span>
	{/if}
</a>
