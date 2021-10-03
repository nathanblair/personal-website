<script>
  import HorizontalLayout from "../components/Layout_Horizontal.svelte"

  import BlogArticle from "../components/Blog/Article.svelte"
  import BlogPlaceholder from "../components/Blog/Placeholder.svelte"
  import BlogTimeline from "../components/Blog/Timeline.svelte"

  import {
    blog_placeholder_class_name,
    default_filter,
    fetch_blog_tree,
    fetch_blog_article_content,
    set_blog_page_default_title,
  } from "../blog.js"
  import { main_id, transition_opacity_class_name } from "../constants.js"

  /**
   * @param {import("../blog.js").Tree} tree
   * @param {() => string} timeline_filter
   */
  async function populate_blogs(tree, timeline_filter = default_filter) {
    const url_filter = location.pathname
      .split("/")[2]
      .split("-")
      .slice(0, 3)
      .join("/")
    let filter = url_filter === "" ? timeline_filter : () => url_filter

    for await (const each_article of fetch_blog_article_content(tree, filter)) {
      new BlogArticle({
        target: document.getElementById(main_id) || document.body,
        // anchor: anchor,
        props: {
          blog_file_name: each_article.file_name,
          date: each_article.date,
          content: each_article.content,
        },
      })
    }

    document
      .querySelectorAll("." + blog_placeholder_class_name)
      .forEach(async (each_placeholder, _) => {
        each_placeholder.classList.add(transition_opacity_class_name)
        await new Promise((resolve) => setTimeout(resolve, ux_wait_time))
        each_placeholder.remove()
      })

    document.getElementById(location.hash.replace(/^#/, ""))?.scrollIntoView()
  }

  const max_placeholder_articles = 10
  const ux_wait_time = 250

  set_blog_page_default_title()
</script>

<h2 id="blog-banner">
  <!--  -->
</h2>

{#if window.location.hash === ""}
  <HorizontalLayout>
    {#await fetch_blog_tree() then tree}
      <BlogTimeline {tree} selection_applied_callback={populate_blogs} />
    {/await}

    <div class="blog-list">
      {#each Array.from({ length: max_placeholder_articles }) as _}
        <BlogPlaceholder />
      {/each}
    </div>
  </HorizontalLayout>
{/if}

<style>
  /* #blog-banner {
    padding: 2vh 4vw;
    text-align: center;
  } */
  .blog-list {
    margin: auto;
    width: 100%;
  }
</style>
