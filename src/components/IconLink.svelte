<script>
  /** @type {string} */
  export let title
  /** @type {string} */
  export let link_target
  export let open_in_new_page = true
</script>

<a href={link_target} {title} target={open_in_new_page ? "_blank" : ""}>
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
