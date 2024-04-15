==<script>
    export let data;
    $: ({ players } = data);
    
    import { goto } from '$app/navigation';
    
    function editPlayer(playerId) {
      goto(`/my-team/player/${playerId}/`);
    }
  </script>
  
  <main>
    <h1>Roster</h1>
    {#if players.length > 0}
      <ul>
        {#each players as { player_id, first_name, last_name }}
          <li>
            {first_name} {last_name}
            <!-- Button to navigate to the edit page for a player -->
            <button on:click={() => editPlayer(player_id)}>Edit</button>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No players found.</p>
    {/if}
  </main>