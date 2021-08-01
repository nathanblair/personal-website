<script>
  /** @type {string} */
  export let universityName
  /** @type {string} */
  export let collegeName
  /** @type {string} */
  export let location
  /** @type {string} */
  export let from
  /** @type {string} */
  export let to

  /** @type {Array<string>}*/
  export let degreeList
</script>

<section class="school">
  <div class="titlebar">
    <span class="name">{universityName}</span><br />
    <hr id="titleDivider" />
    <span class="detail">{collegeName}</span>
  </div>
  <div class="detailbar">
    <span class="location">{location}</span><br class="detailBreak" />
    <hr id="detailDivider" />
    <span class="date">{from} - {to}</span>
  </div>
  <ul class="degreelist">
    {#each degreeList as eachDegree}
      <li>{eachDegree}</li>
    {/each}
  </ul>
</section>

<style>
  .school {
    padding: 20px 0;
  }

  .titlebar {
    text-align: center;
    border-bottom: 1px solid #00001e;
    padding-bottom: 0.5em;
  }

  .detailbar {
    display: flex;
    justify-content: space-between;
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

  .name {
    font-weight: bold;
  }

  .detail {
    font-style: italic;
  }

  .degreelist {
    padding: 0;
    list-style: none;
  }
  .degreelist > li {
    text-align: center;
  }

  .location {
    font-weight: bold;
  }

  @media screen and (min-width: 950px) {
    .detailbar {
      text-align: right;
      font-weight: normal;
    }
  }
</style>
