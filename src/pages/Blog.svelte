<script>
  import BlogArticle from "../components/Blog/Article.svelte"
  import BlogTimeline from "../components/Blog/Timeline.svelte"

  import { fetch_blog_tree, set_blog_page_default_title } from "../blog.js"

  /**
   * @param {string} path
   */
  async function preview_blog(path) {
    for (const each_article of document.getElementsByTagName("article")) {
      each_article.remove()
    }

    new BlogArticle({
      target: document.getElementById("main") || document.body,
      props: {
        id: path,
      },
    })
  }

  document.title = set_blog_page_default_title()
  const hash = location.hash.replace(/^#/, "")
  if (hash != "" && hash != null && hash != undefined)
    document.getElementById(hash)?.scrollIntoView()
</script>

<h2 id="blog-banner">
  <!--  -->
</h2>

{#if location.pathname === "/blog/"}
  {#await fetch_blog_tree() then tree}
    <BlogTimeline {tree} selection_applied_callback={preview_blog} />
  {/await}
{:else}
  <BlogArticle id={location.pathname} />
{/if}

<style>
  #blog-banner {
    padding: 2vh 4vw;
    text-align: center;
  }
</style>
