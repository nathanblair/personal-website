<script>
  import { set_blog_page_default_title } from "../../blog.js"
  import { card_class_name } from "../../constants.js"

  /** @type {string} */
  export let blog_file_name

  /** @type {import("../../blog.js").ArticleDateArray} */
  export let date

  /** @type {string} */
  export let content

  /** @type {string} */
  export let article_class_list = ""

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
    year +
    "-" +
    month +
    "-" +
    day +
    "-" +
    blog_file_name.replace(/.html|.md/, "")

  const full_article_shown = window.location.pathname.split("/")[2] !== ""

  const card_class = full_article_shown ? "" : card_class_name
  const snippet_class_name = full_article_shown ? "" : "snippet"

  document.title = full_article_shown
    ? parse_blog_file_name()
    : set_blog_page_default_title()

  if (full_article_shown) {
    document.head.innerHTML +=
      "<link href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css' rel='stylesheet'/>"
  }
</script>

<article {id} class="{card_class} {snippet_class_name} {article_class_list}">
  <header>
    <h1 class="article-date">{day} {month} {year}</h1>
    <h2 class="article-title">{parse_blog_file_name()}</h2>
  </header>
  {@html content}
  {#if !full_article_shown}
    <a href={id} target="_blank" class="overlay">Read More</a>
  {:else}
    <script
      defer
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"></script>
    <script
      defer
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.js"></script>
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

  :global(blockquote) {
    border-left: 10px solid #ccc;
    border-radius: 4px;
    margin: 20px 0;
    padding: 0 20px;
    color: #333;
  }

  :global(p) {
    padding: 2vh 0;
    line-height: 1.5;
  }

  :global(code) {
    line-height: 1.5;
  }

  :global(ol, ul) {
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

  :global(h5 > a),
  :global(h4 > a),
  :global(h3 > a),
  :global(h2 > a),
  :global(h1 > a) {
    padding: 0 8px 0 0;
  }
</style>
