<script>
  import { blog_placeholder_class_name } from "../../blog.js"

  /** @type {string} */
  export let id
</script>

<div {id} class="card {blog_placeholder_class_name}" />

<style>
  div {
    height: 35vh;
  }
</style>
