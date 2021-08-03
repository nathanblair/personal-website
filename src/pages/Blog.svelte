<script>
  import BlogArticle from "../components/BlogArticle.svelte"
  import BlogTimeline from "../components/BlogTimeline.svelte"

  import { default_filter, fetch_blog_articles } from "../blog.js"
  import { onMount } from "svelte"
  import { main_id } from "../constants.js"

  function extract_filter_from_fragment() {
    return window.location.hash
      .replace(/^#/, "")
      .split("-")
      .slice(0, 2)
      .join("/")
  }

  // Its unfortunate we have to use this hacky workaround
  // But the svelte devs haven't implemented {#each} for asyncGenerator/asyncIterator yet
  onMount(async () => {
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
  })

  const root_element = document.getElementById(main_id) || document.body
  document.title = document.title + " | Blog"
</script>

<BlogTimeline />
