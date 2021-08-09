<script>
  /** @type {string} */
  export let projectName
  /** @type {string} */
  export let role

  /** @type {Array<string>}*/
  export let contributionList
</script>

<section class="contribution">
  <div class="titlebar">
    <span class="name">{projectName}</span><br />
    <hr id="titleDivider" />
    <span class="detail">{role}</span>
  </div>
  <ul class="workdesc">
    {#each contributionList as eachContribution}
      <li>{@html eachContribution}</li>
    {/each}
  </ul>
</section>

<style>
  .titlebar {
    text-align: center;
    border-bottom: 1px solid #00001e;
    padding-bottom: 0.5em;
  }

  .name {
    font-weight: bold;
  }

  .detail {
    font-style: italic;
  }

  .contribution {
    padding: 4% 0;
  }

  .workdesc {
    margin-left: 2em;
  }
  .workdesc > li {
    padding: 4px 0;
  }

  #titleDivider {
    display: none;
  }

  @media screen and (min-width: 950px) {
    .contribution {
      padding: 1% 0;
    }
  }
</style>
