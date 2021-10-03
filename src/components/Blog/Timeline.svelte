<script>
  /** @type {import("../../blog.js").Tree}*/
  export let tree
</script>

{#each tree as each_entry}
  <div>{each_entry.path}</div>
{/each}

<div class="timeline-button">
  <!--  -->
</div>

<div class="timeline">
  <!--  -->
</div>

<style>
  @media only screen and (min-width: 600px) {
    .timeline-button {
      position: absolute;
    }

    .timeline {
      max-width: 20%;
    }
  }
</style>
