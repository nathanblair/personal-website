<script>
  /** @type {string} */
  export let blog_title
  /** @type {string} */
  export let blog_date
  /** @type {string} */
  export let snippet
</script>

<div>
  <header>
    <h1>{blog_title}</h1>
    <h2>{blog_date}</h2>
  </header>
  <p>{snippet}</p>
</div>
