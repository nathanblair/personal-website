<script>
  import BlogArticle from "../components/BlogArticle.svelte"
  import BlogTimeline from "../components/BlogTimeline.svelte"

  import { default_filter, fetch_blog_articles } from "../blog.js"
  import { onMount } from "svelte"

  document.title = document.title + " | Blog"

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
      new BlogArticle({
        target: document.getElementsByTagName("main")[0],
        props: {
          blog_file_name: each_article.file_name,
          date: each_article.date,
          content: each_article.content,
        },
      })
    }
  })
</script>

<BlogTimeline />
