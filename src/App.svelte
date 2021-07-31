<script>
  import Bar from "./components/App/Bar.svelte"
  import Drawer from "./components/App/Drawer.svelte"

  import { page_name_store } from "./stores.js"

  /** @type {import("svelte").SvelteComponent}*/
  let main_page

  /** @param {string} file */
  async function set_page(file) {
    main_page = (await import(`./pages/${file}.svelte`)).default
  }

  page_name_store.subscribe(set_page)
</script>

<Bar />

<div class="horizontal-layout">
  <main>
    <svelte:component this={main_page} />
  </main>
  <Drawer />
</div>

<style lang="scss" global>
  @import "./styles/app";
  @import "./styles/fonts";
  @import "./styles/utilities";
  @import "./themes/default_dark";
  @import "./themes/default_light";

  .horizontal-layout {
    position: relative;
    flex: 1;
    display: flex;
  }

  main {
    position: relative;
    margin: 8px;
    flex: 1;
  }
</style>
