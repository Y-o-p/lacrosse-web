<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData, ActionData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;
    
    $: player = data.player;
    
    function goToRoster() {
      goto('/my-team/roster');
    }
  </script>
  
  <div style="margin-top: 8rem;">
    <h1>Edit Player</h1>
    {#if player}
      <form method="POST" action="?/update">
        <div>
          <label for="first_name">First Name:</label>
          <input type="text" id="first_name" name="first_name" value={player.first_name} />
        </div>
        <div>
          <label for="last_name">Last Name:</label>
          <input type="text" id="last_name" name="last_name" value={player.last_name} />
        </div>
        <div>
          <label for="pos">Position:</label>
          <input type="text" id="pos" name="pos" value={player.pos} />
        </div>
        <div>
          <label for="height">Height:</label>
          <input type="number" id="height" name="height" step="0.01" value={player.height} />
        </div>
        <div>
          <label for="weight">Weight:</label>
          <input type="number" id="weight" name="weight" step="0.01" value={player.weight} />
        </div>
        <div>
          <label for="jersey_num">Jersey Number:</label>
          <input type="number" id="jersey_num" name="jersey_num" value={player.jersey_num} />
        </div>
        <div>
          <label for="clg_class">College Class:</label>
          <input type="text" id="clg_class" name="clg_class" value={player.clg_class} />
        </div>
        <div>
          <label for="major">Major:</label>
          <input type="text" id="major" name="major" value={player.major} />
        </div>
        <div>
          <label for="home_town">Home Town:</label>
          <input type="text" id="home_town" name="home_town" value={player.home_town} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      
      <form method="POST" action="?/delete">
        <button type="submit">Delete Player</button>
      </form>
      
      {#if form?.success}
        <p>Player updated successfully!</p>
        <button on:click={goToRoster}>Go to Roster</button>
      {:else if form?.error}
        <p>Error: {form.error}</p>
      {/if}
    {:else}
      <p>Loading player data...</p>
    {/if}
  </div>