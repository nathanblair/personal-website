<script>
  import BlogArticle from "../components/BlogArticle.svelte"
  import BlogTimeline from "../components/BlogTimeline.svelte"

  import {
    default_filter,
    fetch_blog_articles,
    set_blog_page_default_title,
  } from "../blog.js"
  import { main_id } from "../constants.js"

  function extract_filter_from_fragment() {
    return window.location.hash
      .replace(/^#/, "")
      .split("-")
      .slice(0, 3)
      .join("/")
  }

  async function populate_blogs() {
    const fragment = extract_filter_from_fragment()
    let filter = fragment === "" ? default_filter : () => fragment
    for await (const each_article of fetch_blog_articles(filter)) {
      // TODO Need to insert this instance sorted by date into any pre-existing articles

      // There's also not a way to initialize a Component and populate its slot
      // So this is a poor man's slot
      new BlogArticle({
        target: root_element,
        props: {
          blog_file_name: each_article.file_name,
          date: each_article.date,
          content: each_article.content,
        },
      })
    }
  }

  const root_element = document.getElementById(main_id) || document.body
  // const insert_before_element = root_element.children[0].nextElementSibling

  set_blog_page_default_title()
  populate_blogs()
</script>

<h2 id="blog-banner">Sorted blogs and blog timeline filter coming toon!™</h2>

<BlogTimeline />

<style>
  #blog-banner {
    padding: 2vh 4vw;
    text-align: center;
  }
</style>
