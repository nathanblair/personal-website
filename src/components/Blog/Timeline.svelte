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

  /**
   * @param {number} index
   * @param {number} spacing
   * @param {number} radius
   */
  function calculate_spacing(index, spacing, radius) {
    return index * spacing + radius
  }

  // FIXME Implement the spacing calculation
  // And set up the viewBox, width, and height dynamically using the child element sizes

  const label_rotation = -60

  const line_stroke_width = 1

  const timeline_max_height = 100

  const entry_spacing = 25
  const entry_stroke_width = 0
  const entry_radius = 1.5
  const horizontal_text_padding = 0
  const vertical_text_padding = 0.75
  const text_line_spacing_factor = 2.5

  const timeline_viewbox_width =
    (tree.length - 1) * entry_spacing + 2 * entry_radius + entry_stroke_width
  const timeline_viewbox_height = entry_radius + entry_stroke_width * 2

  const line_y = timeline_viewbox_height

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
      y1={line_y}
      x2={timeline_viewbox_width}
      y2={line_y}
      stroke="black"
      stroke-width={line_stroke_width}
    />
    {#each tree as each_entry, each_index}
      <circle
        cx={calculate_spacing(each_index, entry_spacing, entry_radius)}
        cy={line_y}
        r={entry_radius}
        stroke-width={entry_stroke_width}
        fill="black"
      />
      <!-- transform={`rotate(${label_rotation}, ${
        each_index * entry_spacing + entry_radius
      }, 0)`} -->
      <text y={line_y - vertical_text_padding} fill="black">
        <tspan
          x={each_index * entry_spacing +
            2 * entry_radius +
            horizontal_text_padding}
          class="timeline-date">{extract_date(each_entry.path)}</tspan
        >
        <tspan
          x={each_index * entry_spacing +
            2 * entry_radius +
            horizontal_text_padding}
          dy={text_line_spacing_factor}
          class="timeline-title">{extract_title(each_entry.path)}</tspan
        >
      </text>
    {/each}
  </svg>
</div>

<style>
  .timeline {
    margin: 0 2vw;
    overflow: auto;
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
