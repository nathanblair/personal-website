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

<div class="main-layout">
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
