<script>
  /** @type {string} */
  export let skillTitle
  /** @type {Array<{skill: string, experience: string}>} */
  export let skill
</script>

<table>
  <tr>
    <th colspan="2">{skillTitle}</th>
  </tr>
  {#each skill as { skill, experience }, _}
    <tr>
      <td class="skill">{@html skill}</td>
      <td class="experience">{experience}</td>
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
  }

  .skill {
    text-align: right;
  }
  .experience {
    text-align: left;
  }
</style>
