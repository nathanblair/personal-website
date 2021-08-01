<script>
  /** @type {string} */
  export let degree
  /** @type {string} */
  export let discipline

  /** @type {Array<string>}*/
  export let courses
</script>

<table id="course-table">
  <tr>
    <th>{degree} - {discipline}</th>
  </tr>
  {#each courses as course}
    <tr>
      <td>{course}</td>
    </tr>
  {/each}
</table>

<style>
  table {
    min-width: 300px;
    padding-bottom: 20px;
  }

  td {
    width: 50%;
    padding: 2px 4px;
    white-space: nowrap;
    text-align: center;
  }
</style>
