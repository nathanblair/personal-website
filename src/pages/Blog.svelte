<script>
  import BlogArticle from "../components/Blog/Article.svelte"
  import BlogPlaceholder from "../components/Blog/Placeholder.svelte"
  import BlogTimeline from "../components/Blog/Timeline.svelte"

  import {
    blog_placeholder_class_name,
    default_filter,
    fetch_blog_articles,
    set_blog_page_default_title,
    total_days,
  } from "../blog.js"
  import { main_id } from "../constants.js"

  function extract_filter_from_fragment() {
    return window.location.hash
      .replace(/^#/, "")
      .split("-")
      .slice(0, 3)
      .join("/")
  }

  /** @param {number} index */
  function get_skeleton_id(index) {
    return "day-" + index
  }

  async function populate_blogs() {
    const fragment = extract_filter_from_fragment()
    let filter = fragment === "" ? default_filter : () => fragment

    for await (const each_article of fetch_blog_articles(filter)) {
      const skeleton_id = get_skeleton_id(parseInt(each_article.date[2]))
      const anchor = document.getElementById(skeleton_id) || document.body

      new BlogArticle({
        target: document.getElementById(main_id) || document.body,
        anchor: anchor,
        props: {
          blog_file_name: each_article.file_name,
          date: each_article.date,
          content: each_article.content,
        },
      })
    }

    const placeholders = document.querySelectorAll(
      "." + blog_placeholder_class_name
    )

    for (const each_placeholder of placeholders) {
      each_placeholder.remove()
    }
  }

  /** @type {number[]} */
  const month_days = Array.from(
    { length: total_days },
    (_, i) => total_days - i
  )

  set_blog_page_default_title()
  populate_blogs()
</script>

<h2 id="blog-banner">Sorted blogs and blog timeline filter coming toon!™</h2>

{#each month_days as each_day, _}
  <BlogPlaceholder id={get_skeleton_id(each_day)} />
{/each}

<BlogTimeline />

<style>
  #blog-banner {
    padding: 2vh 4vw;
    text-align: center;
  }
</style>
