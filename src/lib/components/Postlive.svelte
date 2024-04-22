<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { apiCall, patchPlayerStats } from "$lib/api";
    import { getRandomCode } from '$lib/util';

    // Define writable stores for home and away player stats
    export let game: Game;
    let homePlayerStats = [];
    let awayPlayerStats = [];
    let homeNames = [];
    let awayNames = [];
    const game_field = writable("");
    const refs = writable([]);
    const scorekeepers = writable([]);
    const timekeepers = writable([]);

    // Update the writable stores with initial data from the server
    onMount(async () => {
        homePlayerStats = await apiCall<PlayerStats>("GET", `/api/player-stats?game_id=${game.game_id}&team_id=${game.hometeam_id}`);
        awayPlayerStats = await apiCall<PlayerStats>("GET", `/api/player-stats?game_id=${game.game_id}&team_id=${game.awayteam_id}`);
        for (let i = 0; i < homePlayerStats.length; i++) {
            homeNames = [...homeNames, (await apiCall<Player>("GET", `/api/players/${homePlayerStats[i].player_id}`)).last_name];
        }
        for (let i = 0; i < awayPlayerStats.length; i++) {
            awayNames = [...awayNames, (await apiCall<Player>("GET", `/api/players/${awayPlayerStats[i].player_id}`)).last_name];
        }
        game_field.set(game.game_field);
        refs.set(game.refs);
        timekeepers.set(game.timekeepers);
        scorekeepers.set(game.scorekeepers);
        
    });

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
    <h1>Edit Game Statistics</h1>
    <h2>Edit Game Information</h2>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Game Field</th>
                    {#if $refs}
                        <th>Referees</th>
                    {/if}

                    {#if $scorekeepers}
                        <th>Scorekeepers</th>
                    {/if}

                    {#if $timekeepers}
                        <th>Timekeepers</th>
                    {/if}
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td><input type="text" bind:value={$game_field} on:input={(e) => handleGameFieldChange(e.target.value)}></td>
                    {#if $refs}
                        <td><input type="text" bind:value={$refs} on:input={(e) => handleRefsChange(e.target.value)} size={$refs.join('').length}></td>
                    {/if}

                    {#if $scorekeepers}
                        <td><input type="text" bind:value={$scorekeepers} on:input={(e) => handleScorekeepersChange(e.target.value)} size={$scorekeepers.join('').length}></td>
                    {/if}

                    {#if $timekeepers}
                        <td><input type="text" bind:value={$timekeepers} on:input={(e) => handleTimekeepersChange(e.target.value)} size={$timekeepers.join('').length}></td>
                    {/if}
                </tr>
            </tbody>
        </table>
    </div>


    <h2>Edit Player Stats</h2>
    {#each [homePlayerStats, awayPlayerStats] as stats}
        <h3>{stats == homePlayerStats ? "Home Team" : "Away Team"}</h3>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Shots</th>
                        <th>SoG</th>
                        <th>GB</th>
                        <th>T</th>
                        <th>TC</th>
                        <th>C</th>
                        <th>CA</th>
                        <th>FW</th>
                        <th>FL</th>
                        <th>P</th>
                        <th>Saves</th>
                        <th>GA</th>

                    </tr>
                </thead>
                <tbody>
                    {#each stats as stat, index}
                        <tr>
                            <td>{stats == homePlayerStats ? homeNames[index] : awayNames[index]}</td>
                            <td><input type="number" bind:value={stat.goals} on:change={() => {console.log("patching");patchPlayerStats(stat)}}></td>
                            <td><input type="number" bind:value={stat.assists} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.shots} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.shots_on_goal} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.ground_balls} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.turnovers} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.turnovers_caused} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.clears_made} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.clears_attempted} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.faceoffs_won} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.faceoffs_lost} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.penalties} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.saves} on:change={() => patchPlayerStats(stat)}></td>
                            <td><input type="number" bind:value={stat.goals_allowed} on:change={() => patchPlayerStats(stat)}></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/each}
</main>

<style>
    main {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 0px;
        margin-right: 0px;
    }

    h1 {
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    h2 {
        font-size: 25px;
        text-align: center;
    }

    h3 {
        text-align: center;
    }

    .table-wrapper {
        max-height: 500px;
        overflow-y: auto;
        max-width: 100%;
    }

    table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    table td {
        border-style: hidden!important;;
        border: 0.5px solid #b1b1b1;
        padding: 3px 2px;
    }

    table tbody td {
        font-size: 16px;
    }

    table tr:nth-child(even) {
        background: #e0f8d0;
    }

    table thead {
        background: #346856;
        border-bottom: 2px solid #346856;
        position: sticky;
        top: -1px;
        z-index: 9;
    }

    thead th {
        font-size: 16px;
        font-weight: bold;
        color: white;
        position: sticky;
        top: 0px;
        z-index: 9;
    }

    table thead th:first-child {
  		border-left: none;
    }

    table tbody tr:hover {
        background-color: lightgrey;
    }

    input[type="text"] {
        width: 300px;
    }

    input[type="number"] {
        width: 60px; /* Adjust this value to make inputs narrower or wider */
    }

    input {
        background-color: inherit;
        border-color: lightgrey;
        border-radius: 5px;
    }
</style>