<script>
  import Bar from "./components/App/Bar.svelte"
  import Footer from "./components/Footer.svelte"

  async function import_component_file() {
    return import(
      `./pages/${
        window.location.pathname === "/"
          ? "Main"
          : window.location.pathname
              .replaceAll(/\//g, "")
              .slice(1, 2)
              .toLocaleUpperCase() +
            window.location.pathname.replaceAll(/\//g, "").slice(2)
      }.svelte`
    )
  }
</script>

<Bar />

<div class="main-layout">
  <main>
    {#await import_component_file() then componentFile}
      <svelte:component this={componentFile.default} />
    {/await}
  </main>
</div>

<Footer />

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
