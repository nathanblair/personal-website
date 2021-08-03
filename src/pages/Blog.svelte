<script>
  // import BlogArticle from "../components/BlogArticle.svelte"
  import BlogSnippet from "../components/BlogSnippet.svelte"

  import { parse_blog_articles } from "../blog.js"

  document.title = document.title + " | Blog"

  // TODO The initial page load loads up a snippet of all blog posts (or a curated list somehow?)

  // How do we then make it so loading an individual blog article can appropriately
  // change the url so it can work with SEO?
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
