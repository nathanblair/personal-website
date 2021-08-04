<script>
  import { onMount } from "svelte"

  /** @type {string} */
  export let blog_file_name

  /** @type {import("../blog.js").ArticleDateArray} */
  export let date

  /** @type {string} */
  export let content

  /** @type {HTMLDivElement} */
  let content_accessor

  /** @type {HTMLParagraphElement} */
  let snippet_accessor

  /** @type {HTMLAnchorElement} */
  let article_link

  /** @type {string} */
  let snippet

  let toggle = true

  const year = date[0]
  const month = date[1]
  const day = date[2]

  const id =
    year + "-" + month + "-" + day + "-" + blog_file_name.replace(".html", "")

  /**
   * Parse the file name to strip out the date and title
   */
  function parse_blog_file_name() {
    return id.split("-").slice(3).join(" ")
  }

  /**
   * Callback for clicking the article "link"
   *
   * @param {Event} e
   */
  function toggle_article_expansion(e) {
    if (toggle) {
      snippet_accessor.classList.add("hidden")
      content_accessor.classList.remove("hidden")
      if (window.location.hash !== "") {
        e.preventDefault()
      }
    } else {
      snippet_accessor.classList.remove("hidden")
      content_accessor.classList.add("hidden")

      history.replaceState("", "", "/blog")
      e.preventDefault()
    }
    toggle = !toggle
  }

  onMount(() => {
    snippet = content_accessor.firstElementChild?.innerHTML || ""
  })
</script>

<a href={"#" + id} on:click={toggle_article_expansion} bind:this={article_link}>
  <article {id}>
    <header>
      <h1 class="article-date">{day} {month} {year}</h1>
      <h2 class="article-title">{parse_blog_file_name()}</h2>
    </header>
    <div class="article-content hidden" bind:this={content_accessor}>
      {@html content}
    </div>
    <p class="snippet" bind:this={snippet_accessor}>{@html snippet}</p>
  </article>
</a>

<style>
  a {
    text-decoration: none;
    color: unset;
  }

  article {
    border: solid 1px;
    box-shadow: 0 0 4px;
    margin: 2vh 2vw;
  }

  header {
    padding: 4vh 4vw;
  }

  h1,
  h2 {
    padding: 1vh 0;
  }

  .article-date {
    font-weight: normal;
  }

  .snippet {
    position: relative;
  }
  .snippet::after {
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

  .article-content,
  .snippet {
    padding: 10px 5vw;
  }

  :global(p) {
    padding: 2vh 0;
  }
</style>
