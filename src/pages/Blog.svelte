<script>
  import VerticalLayout from "../components/Layout_Vertical.svelte"

  import BlogArticle from "../components/Blog/Article.svelte"
  import BlogPlaceholder from "../components/Blog/Placeholder.svelte"
  import BlogTimeline from "../components/Blog/Timeline.svelte"

  import {
    default_filter,
    fetch_blog_tree,
    fetch_blog_article_content,
    set_blog_page_default_title,
    blog_placeholder_id,
  } from "../blog.js"
  import { main_id } from "../constants.js"

  /**
   * @param {import("../blog.js").Tree} tree
   * @param {string} timeline_filter
   */
  async function populate_blogs(tree, timeline_filter = default_filter()) {
    const url_filter = location.pathname
      .split("/")[2]
      .split("-")
      .slice(0, 3)
      .join("/")
    let filter = url_filter === "" ? timeline_filter : url_filter
    const placeholder = document.getElementById(blog_placeholder_id)

    for await (const each_article of fetch_blog_article_content(tree, filter)) {
      new BlogArticle({
        target: document.getElementById(main_id) || document.body,
        // @ts-ignore
        anchor: placeholder,
        props: {
          blog_file_name: each_article.file_name,
          date: each_article.date,
          content: each_article.content,
        },
      })
    }

    placeholder?.remove()
  }

  document.title = set_blog_page_default_title()
  const hash = location.hash.replace(/^#/, "")
  if (hash != "" && hash != null && hash != undefined)
    document.getElementById(hash)?.scrollIntoView()
</script>

<h2 id="blog-banner">
  <!--  -->
</h2>

<!-- <BlogPlaceholder /> -->
{#if window.location.hash === ""}
  <VerticalLayout>
    {#await fetch_blog_tree() then tree}
      <BlogTimeline {tree} selection_applied_callback={populate_blogs} />
    {/await}
  </VerticalLayout>
{/if}

<style>
  #blog-banner {
    padding: 2vh 4vw;
    text-align: center;
  }
</style>
