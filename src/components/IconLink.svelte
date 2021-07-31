<script>
  /** @type {string} */
  export let title
  /** @type {string} */
  export let link_target
</script>

<a href={link_target} {title} target="_blank">
  <slot />
</a>

<style>
  a {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    text-decoration: none;
    color: inherit;
  }

  a :global(svg) {
    height: min(6vw, 24px);
    width: min(6vw, 24px);
  }

  a :global(span) {
    font-family: "Material Icons";
  }
</style>
