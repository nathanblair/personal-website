<script>
	/** @type {{label?: string, tooltip?: string, href: string, target?: string, children: any}} */
	let { label, href, target = '', tooltip, children } = $props()
</script>

<a
	id="0"
	{href}
	{target}
	title={tooltip || label}
	class="btn-icon flex h-auto w-auto flex-col gap-0 hover:text-surface-contrast-50 dark:hover:text-surface-contrast-900"
>
	{#if children}
		{@render children()}
	{/if}
	{#if label}
		<span>{label}</span>
	{/if}
</a>
