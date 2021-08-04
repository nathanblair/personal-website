<script>
  import { set_blog_page_default_title } from "../blog.js"

  /** @type {string} */
  export let blog_file_name

  /** @type {import("../blog.js").ArticleDateArray} */
  export let date

  /** @type {string} */
  export let content

  /** @type {HTMLElement} */
  let article_accessor

  /** @type {HTMLAnchorElement} */
  let article_anchor_accessor

  /**
   * Parse the file name to strip out the date and title
   */
  function parse_blog_file_name() {
    return id.split("-").slice(3).join(" ")
  }

  const year = date[0]
  const month = date[1]
  const day = date[2]

  const id =
    year + "-" + month + "-" + day + "-" + blog_file_name.replace(".html", "")

  const article_should_be_expanded =
    window.location.hash.replace("#", "") === id

  const card_class_name = article_should_be_expanded ? "" : "card"
  const overlay_class_name = "overlay"
  const snippet_class_name = "snippet"

  document.title = article_should_be_expanded
    ? parse_blog_file_name()
    : set_blog_page_default_title()
</script>

<article {id} class={card_class_name} bind:this={article_accessor}>
  <header>
    <h1 class="article-date">{day} {month} {year}</h1>
    <h2 class="article-title">{parse_blog_file_name()}</h2>
  </header>
  {#if article_should_be_expanded}
    {@html content}
  {:else}
    <a
      href={"#" + id}
      target="_blank"
      class="article-anchor article-content {overlay_class_name} {snippet_class_name}"
      bind:this={article_anchor_accessor}
    >
      {@html content}
    </a>
  {/if}
</article>

<style>
  a {
    text-decoration: none;
    color: unset;
    display: block;
  }

  article {
    padding: 1vh 4vw;
  }

  h1,
  h2 {
    padding: 2vh 0;
  }

  .card {
    border: solid 1px;
    box-shadow: 0 0 4px;
    padding: 2vh;
    margin: 2vh 2vw;
  }

  .article-date {
    font-weight: normal;
  }

  .article-content {
    position: relative;
  }

  .overlay::after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 90%
    );
    width: 100%;
    height: 100%;
  }

  .snippet {
    max-height: 20vh;
    overflow: hidden;
  }

  :global(p) {
    padding: 2vh 0;
  }
</style>
