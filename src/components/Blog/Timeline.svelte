<script>
  /** @type {import("../../blog.js").Tree}*/
  export let tree

  /** @type {(tree: import("../../blog.js").Tree, filter: () => string) => Promise<void>}*/
  export let selection_applied_callback

  /**
   * @param {MouseEvent} e
   */
  function apply_timeline_filter(e) {
    console.log(e)
    // FIXME Use the context of the click action to get the string to pass as the filter
    // and also consider removing that the filter is a function?
    const filter = () => ""

    selection_applied_callback(tree, filter)
  }
</script>

<div class="timeline-button">
  <!--  -->
</div>

<div class="timeline">
  {#each tree as each_entry}
    <div on:click={apply_timeline_filter}>{each_entry.path}</div>
  {/each}
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
