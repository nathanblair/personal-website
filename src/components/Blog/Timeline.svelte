<script>
  import { extract_date, extract_title } from "../../blog.js"

  import { pointer_class_name } from "../../constants.js"

  /** @type {import("../../blog.js").Tree}*/
  export let tree

  /** @type {(path: string) => Promise<void>}*/
  export let selection_applied_callback

  /**
   * @param {MouseEvent} e
   */
  function timeline_entry_clicked(e) {
    // @ts-ignore
    selection_applied_callback(e.currentTarget?.id)
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

  const timeline_date_name = "timeline-date"
  const timeline_title_name = "timeline-title"

  const line_stroke_width = 1

  const timeline_max_height = "100"

  const entry_spacing = 25
  const entry_stroke_width = 0
  const entry_radius = 1.5
  const horizontal_text_padding = 0
  const vertical_text_padding = 0.75
  const text_line_spacing_factor = 2.5

  const timeline_viewbox_width =
    tree.length * entry_spacing + 2 * entry_radius + entry_stroke_width
  const timeline_viewbox_height = entry_radius + entry_stroke_width * 2

  const line_y = timeline_viewbox_height
</script>

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
      <text
        id={each_entry.path}
        y={line_y - vertical_text_padding}
        fill="black"
        class={pointer_class_name}
        on:click={timeline_entry_clicked}
      >
        <tspan
          x={each_index * entry_spacing +
            2 * entry_radius +
            horizontal_text_padding}
          class={timeline_date_name}>{extract_date(each_entry.path)}</tspan
        >
        <tspan
          x={each_index * entry_spacing +
            2 * entry_radius +
            horizontal_text_padding}
          dy={text_line_spacing_factor}
          class={timeline_title_name}>{extract_title(each_entry.path)}</tspan
        >
      </text>
    {/each}
  </svg>
</div>

<style>
  .timeline {
    margin: 0 2vw;
    overflow-x: auto;
    flex-shrink: 0;
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
