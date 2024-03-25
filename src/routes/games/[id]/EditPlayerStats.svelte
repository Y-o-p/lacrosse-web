<script>
    import { onMount } from 'svelte';
    import { useParams } from 'svelte-routing'; 
    import { navigate } from '$app/navigation';
    
    let gameStats = [];
    

    onMount(async () => {
        const { gameId } = useParams();
        const response = await fetch(`/api/games/${gameId}/stats`);
        if (response.ok) {
            const { stats } = await response.json();
            gameStats = stats;
        } else {
            console.error('Failed to fetch game stats');
            
        }
    });
    
    // Function to submit updated stats
    async function submitUpdatedStats() {
        const { gameId } = useParams();
        const response = await fetch(`/api/games/${gameId}/stats`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stats: gameStats }),
        });
    
        if (response.ok) {
            console.log('Stats updated successfully');
            navigate('/'); // Navigate to home page/where we want to route it
        } else {
            console.error('Failed to update stats');
            // handle error
        }
    }
    </script>
    
    <form on:submit|preventDefault={submitUpdatedStats}>
        {#each gameStats as stat, i (stat.playerstat_id)}
            <div class="player-stats">
                <h3>Player {stat.player_id}</h3>
                <label for={`goals-${i}`}>Goals</label>
                <input type="number" id={`goals-${i}`} min="0" bind:value={stat.goals} />
                
                <label for={`assists-${i}`}>Assists</label>
                <input type="number" id={`assists-${i}`} min="0" bind:value={stat.assists} />
                
                <label for={`shots-${i}`}>Shots</label>
                <input type="number" id={`shots-${i}`} min="0" bind:value={stat.shots} />
                
                <label for={`faceoffs-won-${i}`}>Faceoffs Won</label>
                <input type="number" id={`faceoffs-won-${i}`} min="0" bind:value={stat.faceoffs_won} />
                
                <label for={`faceoffs-lost-${i}`}>Faceoffs Lost</label>
                <input type="number" id={`faceoffs-lost-${i}`} min="0" bind:value={stat.faceoffs_lost} />
                
                <label for={`saves-${i}`}>Saves</label>
                <input type="number" id={`saves-${i}`} min="0" bind:value={stat.saves} />
                
                <label for={`penalties-${i}`}>Penalties</label>
                <input type="number" id={`penalties-${i}`} min="0" bind:value={stat.penalties} />
            </div>
        {/each}
        <button type="submit" class="submit-btn">Submit Updates</button>
    </form>
    
    <style>
    .player-stats {
        margin-bottom: 20px;
    }
    
    .player-stats label {
        display: block;
        margin-top: 10px;
    }
    
    .submit-btn {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
    </style>
    