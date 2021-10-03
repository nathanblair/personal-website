<script>
  import { blog_placeholder_class_name } from "../../blog.js"
  import { card_class_name } from "../../constants.js"

  const skeleton_background_color_class_name = "skeleton-background-color"
  const skeleton_border_class_name = "skeleton-border"
</script>

<div class="{card_class_name} {blog_placeholder_class_name} article-skeleton">
  <header>
    <div
      class="h1-skeleton {skeleton_background_color_class_name} {skeleton_border_class_name}"
    />
    <div
      class="h2-skeleton {skeleton_background_color_class_name} {skeleton_border_class_name}"
    />
  </header>
  <p
    class="{skeleton_background_color_class_name} {skeleton_border_class_name}"
  />
  <p
    class="{skeleton_background_color_class_name} {skeleton_border_class_name}"
  />
</div>

<style>
  .skeleton-background-color {
    /* background: linear-gradient(to right, #777, #eee, #777); */
    background: lightgray;
  }

  .skeleton-border {
    border-radius: 8px;
  }

  .article-skeleton {
    height: 35vh;
    padding: 1vh 4vw;
    overflow: hidden;
  }

  .h1-skeleton {
    width: 40%;
  }

  .h2-skeleton {
    width: 60%;
  }

  .h1-skeleton,
  .h2-skeleton {
    padding: 1vh 0;
    margin: 8px 0;
    height: 40px;
  }

  p {
    height: 40px;
    margin-top: 5%;
  }
</style>
