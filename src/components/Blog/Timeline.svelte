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

  /** @param {string} tree_path */
  function extract_date(tree_path) {
    return tree_path.split("/", 3).join("/")
  }

  /** @param {string} tree_path */
  function extract_title(tree_path) {
    return tree_path.split("/")[3].split("-").join(" ").split(".").slice(0, -1)
  }

  const label_rotation = -60

  const line_stroke_width = 1

  const timeline_max_height = 300

  const entry_spacing = 25
  const entry_stroke_width = 0.5
  const entry_width = 2
  const entry_height = 5
  const text_padding = 1

  const timeline_viewbox_width =
    (tree.length - 1) * entry_spacing + entry_width + entry_stroke_width
  const timeline_viewbox_height = entry_height + entry_stroke_width * 2

  // on:click={apply_timeline_filter}
</script>

<div class="timeline-collapser-toggle">
  <!--  -->
</div>

<div class="timeline">
  <svg
    viewBox={`0 0 ${timeline_viewbox_width} ${timeline_viewbox_height}`}
    width={`${
      timeline_viewbox_width * (document.documentElement.clientWidth / 100)
    }px`}
    height={timeline_max_height}
    class="timeline-graphic"
  >
    <line
      x1="0"
      y1={timeline_viewbox_height / 2}
      x2={timeline_viewbox_width}
      y2={timeline_viewbox_height / 2}
      stroke="black"
      stroke-width={line_stroke_width}
    />
    {#each tree as each_entry, each_index}
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
      <text
        x={entry_spacing * each_index}
        y={text_padding + entry_stroke_width / 2}
        transform={`rotate(${label_rotation}, ${
          each_index * entry_spacing
        }, ${text_padding})`}
        fill="black"
      >
        <tspan x={entry_spacing * each_index} class="timeline-date"
          >{extract_date(each_entry.path)}</tspan
        >
        <tspan x={entry_spacing * each_index} dy="1.3em" class="timeline-title"
          >{extract_title(each_entry.path)}</tspan
        >
      </text>
    {/each}
  </svg>
</div>

<style>
  /* .timeline-collapser-toggle {
    position: absolute;
  } */

  .timeline {
    margin: 0 2vw;
    overflow-x: scroll;
  }

  .timeline-graphic {
    display: block;
  }

  svg text {
    font-size: 0.09rem;
  }

  @media only screen and (min-width: 600px) {
  }
</style>
