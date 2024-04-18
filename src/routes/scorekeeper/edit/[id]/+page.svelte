<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { apiCall, patchPlayerStats } from "$lib/api";

    // Define writable stores for home and away player stats
    export let game: Game;
    let homePlayerStats = [];
    let awayPlayerStats = [];
    const game_field = writable("");
    const refs = writable([]);
    const scorekeepers = writable([]);
    const timekeepers = writable([]);

    // Update the writable stores with initial data from the server
    onMount(async () => {
        homePlayerStats = await apiCall<PlayerStats>("GET", `/api/player-stats?game_id=${game.game_id}&team_id=${game.hometeam_id}`);
        awayPlayerStats = await apiCall<PlayerStats>("GET", `/api/player-stats?game_id=${game.game_id}&team_id=${game.awayteam_id}`);
        game_field.set(game.game_field);
        refs.set(game.refs);
        timekeepers.set(game.timekeepers);
        scorekeepers.set(game.scorekeepers);
        
    });

    // Function to handle changes in home player stats
    async function handleHomeStatsChange(index) {
        let result = await patchPlayerStats(homePlayerStats[index]);
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
            {#each homePlayerStats as stat, index}
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
            {#each awayPlayerStats as stat, index}
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
