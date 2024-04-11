<script lang="ts">
    import type { PageServerData } from "./$types";
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { patchPlayerStats } from "$lib/api";

    // Define writable stores for home and away player stats
    const homePlayerStats = writable([]);
    const awayPlayerStats = writable([]);
    const game_field = writable("");
    const refs = writable([]);

    export let data: PageServerData;

    // Update the writable stores with initial data from the server
    onMount(() => {
        homePlayerStats.set(data.homeTeamStats);
        awayPlayerStats.set(data.awayTeamStats);
        game_field.set(data.game.game_field);
        refs.set(data.game.refs);
        
        /*refs.set(null);
        console.log(data.game.refs.length);
        for (let i = 0; i < data.game.refs.length; i++) {
            refs[i].set(data.game.refs.splice(i));
            console.log(refs[i]);
        }*/
        
    });




    // Function to handle changes in home player stats
    async function handleHomeStatsChange(index, field, value) {
        let statToUpdate: Partial<PlayerStats> = {};
        let updatedStats = [];
        homePlayerStats.update(stats => {
            updatedStats = [...stats];
            //console.log(updatedStats);
            console.log(field, value);
            statToUpdate = {
                playerstat_id: (updatedStats[index].playerstat_id), // Include playerstat_id
                player_id: (updatedStats[index].player_id), // Include player_id
                [field]: (value) // Include the changed field and its value
            };
            console.log(statToUpdate);
            
            //Call patchPlayerStats to update the modified player stat
            return updatedStats;
        });
        delete updatedStats[index].Player;
        //console.log(updatedStats[index]);
        console.log("Stats to update: ", updatedStats[index]);

        //console.log("Patching player...returned: ", await patchPlayerStats(updatedStats[index]));
        let new_patch = await patchPlayerStats(updatedStats[index]);
        console.log(new_patch);
        console.log(statToUpdate.playerstat_id);
    }








    // Function to handle changes in away player stats
    async function handleAwayStatsChange(index, field, value) {
        awayPlayerStats.update(stats => {
            const updatedStats = [...stats];
            const statToUpdate = {
                playerstat_id: BigInt(updatedStats[index].playerstat_id), // Include playerstat_id
                [field]: value // Include the changed field and its value
            };
            // Call patchPlayerStats to update the modified player stat
            //await patchPlayerStats(statToUpdate);
            return updatedStats;
        });
    }

    // function to handles changes in game field
    function handleGameFieldChange(value) {
        game_field.update(value);

        // Call patchGame to update the modified game field
    }

    // function to handle changes in refs
    function handleRefsChange(value) {
        refs.update(value);
        return refs;
        // Call patchGame to update the modified refs
    }

    /* Function to handle changes in away player stats
    function handleAwayStatsChange(index, field, value) {
        homePlayerStats.update(stats => {
            const updatedStats = [...stats];
            if (updatedStats[index]) {
                updatedStats[index][field] = value;
                // Call patchPlayerStats to update the modified player stat
            }
            return updatedStats;
        });
    }*/
</script>

<main>
    <h1>Edit Game Stats</h1>
    <table>
        <thead>
            <tr>
                <th>Game Field</th>
                <th>Referees</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td><input type="text" bind:value={$game_field} on:input={(e) => handleGameFieldChange(e.target.value)}></td>
                <td><input type="text" bind:value={$refs} on:input={(e) => handleRefsChange(e.target.value)} size={$refs.join('').length}></td>
            </tr>
        </tbody>
    </table>


    <h1>Edit Player Stats</h1>
    <h2>Home Team</h2>
    <table>
        <thead>
            <tr>
                <th>Player</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Shots</th>
                <th>Shots On Goal</th>
                <th>Ground Balls</th>
                <th>Turnovers</th>
            </tr>
        </thead>
        <tbody>
            {#each $homePlayerStats as stat, index}
                <tr>
                    <td>{stat.Player}</td>
                    <td><input type="number" bind:value={stat.goals} on:input={(e) => handleHomeStatsChange(index, 'goals', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.assists} on:input={(e) => handleHomeStatsChange(index, 'Assists', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.shots} on:input={(e) => handleHomeStatsChange(index, 'Shots', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.shots_on_goal} on:input={(e) => handleHomeStatsChange(index, 'Shots_On_Goal', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.ground_balls} on:input={(e) => handleHomeStatsChange(index, 'Ground_Balls', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.turnovers} on:input={(e) => handleHomeStatsChange(index, 'Turnovers', e.target.value)}></td>
                </tr>
            {/each}
        </tbody>
    </table>

    <h2>Away Team</h2>
    <table>
        <thead>
            <tr>
                <th>Player</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Shots</th>
                <th>Shots On Goal</th>
                <th>Ground Balls</th>
            </tr>
        </thead>
        <tbody>
            {#each $awayPlayerStats as stat, index}
                <tr>
                    <td>{stat.Player}</td>
                    <td><input type="number" bind:value={stat.Goals} on:input={(e) => handleAwayStatsChange(index, 'Goals', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Assists} on:input={(e) => handleAwayStatsChange(index, 'Assists', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Shots} on:input={(e) => handleAwayStatsChange(index, 'Shots', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Shots_On_Goal} on:input={(e) => handleAwayStatsChange(index, 'Shots_On_Goal', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Ground_Balls} on:input={(e) => handleAwayStatsChange(index, 'Ground_Balls', e.target.value)}></td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>
