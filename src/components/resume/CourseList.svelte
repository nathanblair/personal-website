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
</style>
