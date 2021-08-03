<script>
  import BlogArticle from "../components/BlogArticle.svelte"

  import { default_filter, fetch_blog_articles } from "../blog.js"
  import { onMount } from "svelte"

  document.title = document.title + " | Blog"

  // So what may be better is to present each article as a full Blog component
  // but have the blog component maintain a "collapsed" state.
  // When the blog is collapsed, it only shows the snippet
  // When the blog article is clicked, it expands

  // Each blog article also needs to be stored with an "id" and when
  // the blog is expanded, the window href gets set with the fragment using that
  // "id"
  onMount(async () => {
    for await (const each_article of fetch_blog_articles(default_filter)) {
      new BlogArticle({
        target: document.getElementsByTagName("main")[0],
        props: {
          blog_file_name: each_article.file_name,
          date: each_article.date,
        },
      })
    }
  })
</script>
