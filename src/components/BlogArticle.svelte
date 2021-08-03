<script>
  import { onMount } from "svelte"

  /** @type {string} */
  export let blog_file_name

  /** @type {import("../blog.js").ArticleDateArray} */
  export let date

  /** @type {HTMLDivElement} */
  let content_accessor

  /** @type {string} */
  let snippet

  let id = blog_file_name.replace(".html", "")

  /**
   * Parse the file name to strip out the date and title
   */
  function parse_blog_file_name() {
    const blog_title = id.replace("-", " ")
    return blog_title
  }

  onMount(() => {
    snippet = content_accessor.firstElementChild?.innerHTML || ""
  })
</script>

<article {id}>
  <header>
    <h1>{parse_blog_file_name()}</h1>
    <h2>{date[2]} {date[1]} {date[0]}</h2>
  </header>
  <div class="article-content" bind:this={content_accessor}>
    <slot />
  </div>
  <p class="snippet">{snippet}</p>
</article>

<style>
  .article-content {
    display: none;
  }
</style>
