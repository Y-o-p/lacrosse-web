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
    const scorekeepers = writable([]);
    const timekeepers = writable([]);

    export let data: PageServerData;

    // Update the writable stores with initial data from the server
    onMount(() => {
        homePlayerStats.set(data.homeTeamStats);
        awayPlayerStats.set(data.awayTeamStats);
        game_field.set(data.game.game_field);
        refs.set(data.game.refs);
        timekeepers.set(data.game.timekeepers);
        scorekeepers.set(data.game.scorekeepers);
        
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

<<<<<<< HEAD

=======
>>>>>>> 71845d195e171bc5935d6696b5b0795314656720
    // Function to handle changes in away player stats
    async function handleAwayStatsChange(index, field, value) {
        let statsToUpdate: Partial<PlayerStats> = {};
        let updatedStats = [];
        awayPlayerStats.update(stats => {
            updatedStats = [...stats];
            //console.log(updatedStats);
            console.log(field, value);
            statsToUpdate = {
                playerstat_id: (updatedStats[index].playerstat_id), // Include playerstat_id
                player_id: (updatedStats[index].player_id), // Include player_id
            };
            console.log(statsToUpdate);
            //Call patchPlayerStats to update the modified player stat
            return updatedStats;
        });
        delete updatedStats[index].Player;
        //console.log(updatedStats[index]);
        console.log("Stats to update: ", updatedStats[index]);

        //console.log("Patching player...returned: ", await patchPlayerStats(updatedStats[index]));
        let new_patch = await patchPlayerStats(updatedStats[index]);
        console.log(new_patch);
        console.log(statsToUpdate.playerstat_id);
    }

    // function to handles changes in game field
    function handleGameFieldChange(value) {
        game_field.update(value);

        // Call patchGame to update the modified game field
        //let new_patch = await
    }

    // function to handle changes in refs
    function handleRefsChange(value) {
        refs.update(value);
        return refs;
        // Call patchGame to update the modified refs
    }

    //function to handle changes in scorekeepers
    function handleScorekeepersChange(value) {
        scorekeepers.update(value);
        return scorekeepers;
        // Call patchGame to update the modified scorekeepers
    }

    //function to handle changes in timekeepers
    function handleTimekeepersChange(value) {
        timekeepers.update(value);
        return timekeepers;
        // Call patchGame to update the modified timekeepers
    }
</script>

<main>
    <h1>Edit Game Stats</h1>
    <table>
        <thead>
            <tr>
                <th>Game Field</th>
                <th>Referees</th>
                <th>Scorekeepers</th>
                <th>Timekeepers</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td><input type="text" bind:value={$game_field} on:input={(e) => handleGameFieldChange(e.target.value)}></td>
                <td><input type="text" bind:value={$refs} on:input={(e) => handleRefsChange(e.target.value)} size={$refs.join('').length}></td>
                <td><input type="text" bind:value={$scorekeepers} on:input={(e) => handleScorekeepersChange(e.target.value)} size={$scorekeepers.join('').length}></td>
                <td><input type="text" bind:value={$timekeepers} on:input={(e) => handleTimekeepersChange(e.target.value)} size={$timekeepers.join('').length}></td>
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
                <th>Turnovers Caused</th>
                <th>Clears Made</th>
                <th>Clears Attempted</th>
                <th>Faceoffs Won</th>
                <th>Faceoffs Lost</th>
                <th>Penalites</th>
                <th>saves</th>
                <th>Goals Allowed</th>

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
                    <td><input type="number" bind:value={stat.turnovers_caused} on:input={(e) => handleHomeStatsChange(index, 'Turnovers_Caused', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.clears_made} on:input={(e) => handleHomeStatsChange(index, 'Clears_Made', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.clears_attempted} on:input={(e) => handleHomeStatsChange(index, 'Clears_Attempted', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.faceoffs_won} on:input={(e) => handleHomeStatsChange(index, 'Faceoffs_Won', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.faceoffs_lost} on:input={(e) => handleHomeStatsChange(index, 'Faceoffs_Lost', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.penalities} on:input={(e) => handleHomeStatsChange(index, 'Penalities', e.target.value)}></td>
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
                <th>Turnovers</th>
                <th>Turnovers Caused</th>
                <th>Clears Made</th>
                <th>Clears Attempted</th>
                <th>Faceoffs Won</th>
                <th>Faceoffs Lost</th>
                <th>Penalites</th>
                <th>Saves</th>
                <th>Goals Allowed</th>
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
                    <td><input type="number" bind:value={stat.Turnovers} on:input={(e) => handleAwayStatsChange(index, 'Turnovers', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Turnovers_Caused} on:input={(e) => handleAwayStatsChange(index, 'Turnovers_Caused', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Clears_Made} on:input={(e) => handleAwayStatsChange(index, 'Clears_Made', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Clears_Attempted} on:input={(e) => handleAwayStatsChange(index, 'Clears_Attempted', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Faceoffs_Won} on:input={(e) => handleAwayStatsChange(index, 'Faceoffs_Won', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Faceoffs_Lost} on:input={(e) => handleAwayStatsChange(index, 'Faceoffs_Lost', e.target.value)}></td>
                    <td><input type="number" bind:value={stat.Penalities} on:input={(e) => handleAwayStatsChange(index, 'Penalities', e.target.value)}></td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>


<style>
    main {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 15px;
        margin-right: 115px;
		
    }

	h1 {
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }
</style>