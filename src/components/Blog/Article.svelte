<script>
  import {
    extract_date,
    extract_title,
    fetch_blog_article_content,
    set_blog_page_default_title,
  } from "../../blog.js"
  import { card_class_name } from "../../constants.js"

  /** @type {string} */
  export let id

  /** @type {string} */
  export let article_class_list = ""

  /** @type {HTMLDivElement} */
  let content_area

  const title = extract_title(id)
  const date = extract_date(id)

  const full_article_shown = location.pathname.split("/")[2] !== ""

  const card_class = full_article_shown ? "" : card_class_name
  const snippet_class_name = full_article_shown ? "" : "snippet"

  document.title = full_article_shown ? title : set_blog_page_default_title()

  if (full_article_shown) {
    document.head.innerHTML +=
      "<link href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css' rel='stylesheet'/>"
  }

  fetch_blog_article_content(id).then((article) => {
    content_area.innerHTML = article.content
  })
</script>

<article {id} class="{card_class} {snippet_class_name} {article_class_list}">
  <header>
    <h1 class="article-date">{date}</h1>
    <h2 class="article-title">{title}</h2>
  </header>
  <div
    bind:this={content_area}
    class={full_article_shown ? "" : "no-pointer-events"}
  />
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

  article > header > h1,
  article > header > h2 {
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
    overflow: hidden;
  }

  :global(blockquote) {
    border-left: 5px solid #ddd;
    border-radius: 4px;
    margin: 20px 0;
    padding: 0 20px;
    color: #888;
  }

  :global(blockquote > p) {
    padding: 8px 0;
  }

  :global(p) {
    padding: 1vh 0;
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
    text-align: center;
    padding: 2vh 0;
  }

  :global(h5) {
    font-size: 1.1rem;
  }
  :global(h4) {
    font-size: 1.25rem;
  }
  :global(h3) {
    font-size: 1.5rem;
  }
  :global(h2) {
    font-size: 1.75rem;
  }
  :global(h1) {
    font-size: 2rem;
  }

  :global(h5 > a),
  :global(h4 > a),
  :global(h3 > a),
  :global(h2 > a),
  :global(h1 > a) {
    padding: 0 8px 0 0;
  }

  :global(.highlight > pre) {
    background-color: rgba(246, 248, 250);
    padding: 10px;
    overflow-x: scroll;
  }

  @media screen and (min-width: 950px) {
    :global(h1, h2, h3, h4, h5) {
      text-align: left;
    }

    :global(h5 > a.anchor),
    :global(h4 > a.anchor),
    :global(h3 > a.anchor),
    :global(h2 > a.anchor),
    :global(h1 > a.anchor) {
      visibility: hidden;
    }

    :global(h5:hover > a.anchor),
    :global(h4:hover > a.anchor),
    :global(h3:hover > a.anchor),
    :global(h2:hover > a.anchor),
    :global(h1:hover > a.anchor) {
      visibility: visible;
    }
  }
</style>
