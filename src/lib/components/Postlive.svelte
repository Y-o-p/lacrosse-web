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
    <h1>Edit Game Stats</h1>
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


    <h1>Edit Player Stats</h1>
    {#each [homePlayerStats, awayPlayerStats] as stats}
        <h2>{stats == homePlayerStats ? "Home Team" : "Away Team"}</h2>
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
    {/each}
</main>

<style>
    table {
        width: 50%;
        border-collapse: collapse;
    }

    th, td {
        padding: 8px;
        width: 2px;
        text-align: left;
    }

    input[type="number"] {
        width: 60px; /* Adjust this value to make inputs narrower or wider */
    }
</style>