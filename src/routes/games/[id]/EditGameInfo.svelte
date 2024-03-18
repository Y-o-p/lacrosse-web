<script>
    import { onMount } from 'svelte';
    import { navigate } from '$app/navigation';
    import { page } from '$app/stores'; 
    
    // Initialize gameinfo
    let gameInfo = {
      game_date: '',
      game_field: '',
      hometeam_id: '',
      awayteam_id: ''
    };
  
    // extract the game ID from the URL using the page store
    const id = $page.params.id;
  
    
    onMount(async () => { //handles fetching 
      
      const response = await fetch(`/api/games/${id}`);
      if (response.ok) {
        gameInfo = await response.json();
      } else {
        console.error('Failed to fetch game data');
        
      }
    });
  
    // this handles submission and updates game data
    async function saveChanges(event) {
      event.preventDefault(); 
      
      const response = await fetch(`/api/games/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameInfo) 
      });
      
      if (response.ok) {
        console.log('Game info updated successfully');
        navigate('/'); 
      } else {
        console.error('Failed to update game info');
        //handles update failure
      }
    }
  </script>
  
  <form on:submit|preventDefault={saveChanges}>
    <!-- form fields for editing game information -->
    <input bind:value={gameInfo.game_date} type="date" placeholder="Game Date" />
    <input bind:value={gameInfo.game_field} placeholder="Game Field" />
    <input bind:value={gameInfo.hometeam_id} type="number" placeholder="Home Team ID" />
    <input bind:value={gameInfo.awayteam_id} type="number" placeholder="Away Team ID" />
    <button type="submit">Save Changes</button>
  </form>
  