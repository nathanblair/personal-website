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

  let id = blog_file_name.replace(".html", "")

  // FIXME How can we implement a direct link to page articles using fragments
  // if the article list is only loaded dynamically?
  // We would have to put embed the date parameters into the fragment
  // and then whenever the blog page loads, check the url fragment to see if
  // the date parameters are in there, and if they are, use those to construct
  // the filter passed when the page loads

  /**
   * Parse the file name to strip out the date and title
   */
  function parse_blog_file_name() {
    const blog_title = id.replace("-", " ")
    return blog_title
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

<a
  href={window.location.href + "#" + id}
  on:click={toggle_article_expansion}
  bind:this={article_link}
>
  <article {id}>
    <header>
      <h1>{parse_blog_file_name()}</h1>
      <h2>{date[2]} {date[1]} {date[0]}</h2>
    </header>
    <div class="article-content hidden" bind:this={content_accessor}>
      {@html content}
    </div>
    <p class="snippet" bind:this={snippet_accessor}>{snippet}</p>
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
    padding: 10px 10vw;
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
</style>
