<script>
  /** @type {string} */
  export let employerName
  /** @type {string} */
  export let jobTitle
  /** @type {string} */
  export let location
  /** @type {string} */
  export let monthFrom
  /** @type {string} */
  export let yearFrom
  /** @type {string} */
  export let monthTo
  /** @type {string} */
  export let yearTo

  /** @type {Array<string>}*/
  export let jobHighlights
</script>

<section class="job">
  <div class="titlebar">
    <span class="name">{employerName}</span><br />
    <hr id="titleDivider" />
    <span class="detail">{jobTitle}</span>
  </div>
  <div class="detailbar">
    <span class="location">{location}</span><br class="detailBreak" />
    <hr id="detailDivider" />
    <span class="date"
      ><span class="month">{monthFrom} </span>{yearFrom} -
      <span class="month">{monthTo} </span>
      {yearTo}</span
    >
  </div>
  <ul class="workdesc">
    {#each jobHighlights as jobHighlight}
      <li>{@html jobHighlight}</li>
    {/each}
  </ul>
</section>

<style>
  .titlebar {
    text-align: center;
    border-bottom: 1px solid #00001e;
    padding-bottom: 0.5em;
  }

  .detailbar {
    display: flex;
    justify-content: space-between;
  }

  .location {
    font-weight: bold;
  }

  .month {
    display: none;
  }

  .name {
    font-weight: bold;
  }

  .detail {
    font-style: italic;
  }

  .job {
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

  #detailDivider {
    display: none;
  }

  .detailBreak {
    display: none;
  }

  @media screen and (min-width: 950px) {
    .detailbar {
      text-align: right;
      font-weight: normal;
    }

    .month {
      display: inline;
    }

    .job {
      padding: 1% 0;
    }
  }
</style>
