<script>
  /** @type {string} */
  export let skillTitle
  /** @type {Array<{skill: string, experience: string}>} */
  export let skill
</script>

<table>
  <tr>
    <th>{skillTitle}</th>
  </tr>
  {#each skill as { skill, experience }, _}
    <tr>
      <td>{@html skill}</td>
      <td>{experience}</td>
    </tr>
  {/each}
</table>

<style>
</style>
