<script>
  import BlogArticle from "../components/Blog/Article.svelte"
  import BlogPlaceholder from "../components/Blog/Placeholder.svelte"
  import BlogTimeline from "../components/Blog/Timeline.svelte"

  import {
    blog_placeholder_class_name,
    default_filter,
    update_blog_timeline,
    fetch_blog_articles,
    set_blog_page_default_title,
    total_days,
  } from "../blog.js"
  import { main_id, transition_opacity_class_name } from "../constants.js"

  /** @param {number} index */
  function get_skeleton_id(index) {
    return "day-" + index
  }

  /**
   * @param {import("../blog.js").Tree} tree
   * @param {() => string} timeline_filter
   */
  async function populate_blogs(tree, timeline_filter = default_filter) {
    const url_filter = window.location.pathname
      .split("/")[2]
      .split("-")
      .slice(0, 3)
      .join("/")
    let filter = url_filter === "" ? timeline_filter : () => url_filter

    for await (const each_article of fetch_blog_articles(tree, filter)) {
      const skeleton_id = get_skeleton_id(parseInt(each_article.date[2]))
      const anchor = document.getElementById(skeleton_id)

      new BlogArticle({
        target: document.getElementById(main_id) || document.body,
        // @ts-ignore
        anchor: anchor,
        props: {
          blog_file_name: each_article.file_name,
          date: each_article.date,
          content: each_article.content,
        },
      })

      anchor?.remove()
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

  /**
   * For reverse-chronological sorting order
   *
   * @type {number[]}
   * */
  const month_days = Array.from(
    { length: total_days },
    (_, i) => total_days - i
  )

  const ux_wait_time = 250

  set_blog_page_default_title()
  // FIXME Populating the blogs needs to happen as a callback to a timeline selection being applied
  // populate_blogs(tree)
</script>

{#await update_blog_timeline() then tree}
  <BlogTimeline {tree} selection_applied_callback={populate_blogs} />
{/await}

<!-- <h2 id="blog-banner" /> -->

{#if window.location.hash === ""}
  {#each month_days as each_day}
    <BlogPlaceholder id={get_skeleton_id(each_day)} />
  {/each}
{/if}

<style>
  /* #blog-banner {
    padding: 2vh 4vw;
    text-align: center;
  } */
</style>
