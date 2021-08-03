<script>
  import BlogArticle from "../components/BlogArticle.svelte"
  import BlogTimeline from "../components/BlogTimeline.svelte"

  import { default_filter, fetch_blog_articles } from "../blog.js"
  import { onMount } from "svelte"

  document.title = document.title + " | Blog"

  // Its unfortunate we have to use this hacky workaround
  // But the svelte devs haven't implemented {#each} for asyncGenerator/asyncIterator yet
  onMount(async () => {
    if (window.location.hash === "") {
      for await (const each_article of fetch_blog_articles(default_filter)) {
        new BlogArticle({
          target: document.getElementsByTagName("main")[0],
          props: {
            blog_file_name: each_article.file_name,
            date: each_article.date,
            content: each_article.content,
          },
        })
      }
    }
  })
</script>

<BlogTimeline />
