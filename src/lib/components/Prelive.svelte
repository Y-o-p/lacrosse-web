<script lang="ts">
    import { apiCall, patchGame } from "$lib/api";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let game;
    export let homeLineup = new Array<Player>(10);
    export let awayLineup = new Array<Player>(10);
    export let homeRoster = [];
    export let awayRoster = [];

    // Team Names
    let teams = [];
    
    onMount(async () => {
        if (homeLineup.length == 0) {
            homeLineup = new Array<Player>(10);
            awayLineup = new Array<Player>(10);
        }
        teams = await apiCall<Array<Team>>("GET", `/api/teams`);
    });


    let quarterLength = ''; // Initialize quarter length variable
    let homeTeam = null; // Team IDs
    let awayTeam = null; // Team IDs

    let selectedHomeTeam;
    const handleHomeTeamSelect = async (event) => {
        // Populate the home roster array
        selectedHomeTeam = event.target.value;
        homeRoster = await apiCall<Player>("GET", `/api/players?team_id=${selectedHomeTeam}`);
        homeLineup = homeRoster.slice(0, 10);
    };

    let selectedAwayTeam;
    const handleAwayTeamSelect = async (event) => {
        selectedAwayTeam = event.target.value;
        awayRoster = await apiCall<Player>("GET", `/api/players?team_id=${selectedAwayTeam}`);
        awayLineup = awayRoster.slice(0, 10);
    };

    async function startGame() {
        homeTeam = selectedHomeTeam;
        awayTeam = selectedAwayTeam;
        game.hometeam_id = homeTeam;
        game.awayteam_id = awayTeam;
        await patchGame(game);
        dispatch("start");
    }

    let selectedPlayers = [];

    const handleHomePlayerSelect = (event) => {
        selectedPlayers.push(event.target.value);
    }

    const handleAwayPlayerSelect = (event) => {

    }
</script>

<main>
    <h1>Choose the Lineups</h1>
    <form on:submit={() => {startGame()}}>
        <div>
            <label for="homeTeamSelect">Home Team:</label>
            <select bind:value={selectedHomeTeam} on:change={handleHomeTeamSelect} required>
                <option value="">Select Team</option>
                {#each teams as team}
                    <option value={team.team_id}>{team.team_name}</option>
                {/each}
            </select>

            
            {#each homeLineup as player, i}
                <div>
                    <label for="homePlayerSelect">Player {i+1}:</label>
                    <select bind:value={player} on:change={handleHomePlayerSelect} required>
                        <option value="">Select Player</option>
                        {#each homeRoster as playerFromRoster}
                            <option value={playerFromRoster}>{playerFromRoster.last_name}</option>
                        {/each}
                    </select>
                </div>
            {/each}
            <hr />
        </div>

        <div>
        
            <label for="awayTeamSelect">Away Team:</label>
            <select bind:value={selectedAwayTeam} on:change={handleAwayTeamSelect} required>
                <option value="">Select Team</option>
                {#each teams as team}
                        <option value={team.team_id}>{team.team_name}</option>
                {/each}
            </select>

            {#each awayLineup as player, i}
                <div>
                    <label for="homePlayerSelect">Player {i+1}:</label>
                    <select bind:value={player} on:change={handleAwayPlayerSelect} required>
                        <option value="">Select Player</option>
                        {#each awayRoster as playerFromRoster}
                            <option value={playerFromRoster}>{playerFromRoster.last_name}</option>
                        {/each}
                    </select>
                </div>
            {/each}

            <hr />
        </div>



        <div>
            <label>Quarter length (minutes):</label>
            <input type="text" id="quarterLength" name="quarterLength" bind:value={quarterLength} required>
            <button type="submit">Start Game</button>
        </div>

        <input type="hidden" name="homeTeamId" value={selectedHomeTeam}>
        <input type="hidden" name="awayTeamId" value={selectedAwayTeam}>

        <input type="hidden" name="homePlayersIds" value={homeLineup} required>
        <input type="hidden" name="awayPlayersIds" value={awayLineup} required>
    </form>
</main>