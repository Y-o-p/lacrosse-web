<script context="module" lang="ts">
   
    export async function load({ params, fetch }) {
        const { id } = params;
        
        const response = await fetch(`/api/players/${id}`);
        if (!response.ok) {
            return { status: response.status, error: new Error('Player not found') };
        }
        const player = await response.json();
        
        return { props: { player } };
    }
</script>

<script lang="ts">
    
    
    export let player; // Received from the load function above
    
    async function handleSubmit() {
        const response = await fetch(`/api/players/${player.id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(player),
        });

        if (response.ok) {
            
        } else {
            
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input bind:value={player.first_name} placeholder="First Name" />
    <input bind:value={player.last_name} placeholder="Last Name" />
    <input bind:value={player.pos} placeholder="Position" />
    <input bind:value={player.player_number} placeholder="Player Number" />
    <input bind:value={player.height} placeholder="Height" />
    <input bind:value={player.weight} placeholder="Weight" />
    <input bind:value={player.birth_date} placeholder="Birth Date" />

    <button type="submit">Save Changes</button>
</form>
