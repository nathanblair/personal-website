<script>
</script>

<div id="container">
  <slot />
</div>

<style>
  #container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    row-gap: 20px;
    align-items: start;
  }
</style>
