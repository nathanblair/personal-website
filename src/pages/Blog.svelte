<script>
  // import BlogArticle from "../components/BlogArticle.svelte"
  import BlogSnippet from "../components/BlogSnippet.svelte"

  import { parse_blog_articles } from "../blog.js"

  document.title = document.title + " | Blog"

  // TODO The initial page load loads up a snippet of all blog posts (or a curated list somehow?)

  // How do we then make it so loading an individual blog article can appropriately
  // change the url so it can work with SEO?

  // Something like replacing all of the blog articles with a single BlogArticle
  // whose slot is set to {@html each_article.article}

  // May need to do something like a component property attribute get
  // in a callback function of the on_click handler of the BlogSnippet
  // (which requires that special svelte option setting...)
</script>

{#await parse_blog_articles() then articles}
  {#each articles as each_article}
    <BlogSnippet
      blog_title={each_article.title}
      blog_date={each_article.date}
      snippet={each_article.snippet}
    />
  {/each}
{/await}

<!-- <svelte:component this={BlogArticle}>
  {@html each_article}
</svelte:component> -->
