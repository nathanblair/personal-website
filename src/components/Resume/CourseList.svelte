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
    padding: 0 20px 20px 20px;
  }

  table td {
    max-width: 200px;
  }

  td {
    padding: 2px 4px;
    text-align: center;
  }
</style>
