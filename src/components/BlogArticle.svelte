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

  const full_article_shown = window.location.hash.replace("#", "") === id

  const card_class_name = full_article_shown ? "" : "card"
  const snippet_class_name = full_article_shown ? "" : "snippet"

  document.title = full_article_shown
    ? parse_blog_file_name()
    : set_blog_page_default_title()
</script>

<article
  {id}
  class="{card_class_name} {snippet_class_name}"
  bind:this={article_accessor}
>
  <header>
    <h1 class="article-date">{day} {month} {year}</h1>
    <h2 class="article-title">{parse_blog_file_name()}</h2>
  </header>
  {@html content}
  {#if !full_article_shown}
    <a href={"#" + id} target="_blank" class="overlay">Read More</a>
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
    position: relative;
  }

  h1,
  h2 {
    padding: 1vh 0;
    font-weight: normal;
  }

  h2 {
    font-style: italic;
  }

  .card {
    border: solid 1px;
    box-shadow: 0 0 4px;
    padding: 2vh;
    margin: 2vh 2vw;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    font-size: 1.1em;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 5%,
      rgba(255, 255, 255, 1) 100%
    );
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0 0 2vh 0;
  }

  .snippet {
    max-height: 35vh;
    overflow: hidden;
  }

  :global(p) {
    padding: 2vh 0;
    line-height: 1.5;
  }

  :global(ol) {
    padding: revert;
  }

  :global(ol > li) {
    padding: 0.75vh 0;
  }

  :global(dl, dl dd, dl dt) {
    padding: 1vh 2vw;
  }

  :global(h1, h2, h3, h4, h5) {
    padding: 2vh 0;
  }
</style>
