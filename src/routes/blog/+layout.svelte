<script lang="ts">
	let { children } = $props()
</script>

<div id="blog-main" class="relative flex flex-1 flex-col space-y-4 pt-3">
	{@render children()}
</div>
