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

  const line_stroke_width = 1

  const entry_spacing = 25
  const entry_stroke_width = 0.5
  const entry_width = 5
  const entry_height = 10

  const timeline_viewbox_width = 100
  const timeline_viewbox_height = entry_height + entry_stroke_width * 2

  // on:click={apply_timeline_filter}
</script>

<div class="timeline-collapser-toggle">
  <!--  -->
</div>

<div class="timeline">
  <svg
    viewBox={`0 0 ${timeline_viewbox_width} ${timeline_viewbox_height}`}
    class="timeline-graphic"
  >
    <line
      x1="0"
      y1={timeline_viewbox_height / 2}
      x2="100"
      y2={timeline_viewbox_height / 2}
      stroke="black"
      stroke-width={line_stroke_width}
    />
    {#each tree as _each_entry, each_index}
      <!-- TODO Along svg line element, insert clickable svg box elements -->
      <!-- for each blog entry -->
      <!-- Show the date of each blog entry above the clicable svg box elements -->
      <rect
        x={entry_spacing * each_index + entry_stroke_width / 2}
        y={entry_stroke_width}
        width={entry_width}
        height={entry_height}
        rx="2"
        fill-opacity="0"
        stroke-width={entry_stroke_width}
        stroke="black"
      />
      <!-- <text x={entry_spacing * each_index}>{each_entry.path}</text> -->
    {/each}
  </svg>
</div>

<style>
  /* .timeline-collapser-toggle {
    position: absolute;
  } */

  .timeline {
    position: relative;
    /* max-width: 20%; */
    width: 100%;
    padding: 0 2vw;
    /* overflow-x: scroll; */
  }

  .timeline-graphic {
    display: block;
  }

  @media only screen and (min-width: 600px) {
  }
</style>
