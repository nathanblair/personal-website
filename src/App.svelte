<script>
  import Bar from "./components/App/Bar.svelte"
  import Footer from "./components/Footer.svelte"
  import { main_id } from "./constants.js"
  // import Drawer from "./components/App/Drawer.svelte"

  async function import_component_file() {
    const page_name = window.location.pathname.split("/")[1]
    return import(
      `./pages/${
        window.location.pathname === "/"
          ? "Main"
          : page_name.slice(0, 1).toLocaleUpperCase() + page_name.slice(1)
      }.svelte`
    )
  }
</script>

<Bar />

<div class="main-layout">
  <!-- <Drawer /> -->
  <main id={main_id}>
    {#await import_component_file() then componentFile}
      <svelte:component this={componentFile.default} />
    {/await}
  </main>
</div>

<Footer />

<style lang="scss" global>
  @import "github-syntax-light/lib/github-light";
  // @import "@primer/css/dist/markdown";

  @import "./styles/animations";
  @import "./styles/app";
  @import "./styles/fonts";
  @import "./styles/transitions";
  @import "./styles/utilities";
  @import "./themes/default_dark";
  @import "./themes/default_light";

  .main-layout {
    position: relative;
    display: flex;
    flex: 1;
    height: 0; // Use the layout for flex side-effects (since main overflow is set to scroll)
  }

  main {
    overflow-y: auto;
    scrollbar-width: none;
    position: relative;
    flex: 1;
  }
</style>
