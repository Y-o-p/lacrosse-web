<script lang="ts">
    import { apiCall, patchGame } from "$lib/api";
    import { onMount } from "svelte";
    
    export let game;
    export let homeLineup = new Array<Player>(10);
    export let awayLineup = new Array<Player>(10);
    let homeRoster = [];
    let awayRoster = [];

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
    export let homeTeam = null; // Placeholder for home team data
    export let awayTeam = null; // Placeholder for away team data

    let selectedHomeTeam;
    const handleHomeTeamSelect = async (event) => {
        // Populate the home roster array
        selectedHomeTeam = event.target.value;
        homeRoster = await apiCall<Array<Player>>("GET", `/api/players?team_id=${selectedHomeTeam}`);
        homeLineup.forEach((player, i) => {
            homeLineup[i] = homeRoster[i];
        });
        homeLineup = homeLineup;
    };

    let selectedAwayTeam;
    const handleAwayTeamSelect = async (event) => {
        selectedAwayTeam = event.target.value;
        awayRoster = await apiCall<Array<Player>>("GET", `/api/players?team_id=${selectedAwayTeam}`);
        awayLineup.forEach((player, i) => {
            awayLineup[i] = awayRoster[i];
        });
        awayLineup = awayLineup;
    };

    async function startGame() {
        homeTeam = selectedHomeTeam;
        awayTeam = selectedAwayTeam;

        console.log(homeTeam);
        console.log(awayTeam);
        console.log(game);
        let playerStats = await apiCall<PlayerStats>("GET", `/api/player-stats?game_id=${game.game_id}&team_id=${homeTeam}`);
        console.log(playerStats);
        playerStats = playerStats.concat(await apiCall<PlayerStats>("GET", `/api/player-stats?game_id=${game.game_id}&team_id=${awayTeam}`));

        [...homeRoster, ...awayRoster].forEach(async (player) => {
            const stats = playerStats.find((stats) => player.player_id == stats.player_id);
            if (stats === undefined) {
                const newStats = await apiCall<PlayerStats>("POST", `/api/player-stats`, {
                    game_id: game.game_id,
                    player_id: player.player_id,
                    team_id: player.team_id,
                    goals: 0,
                    assists: 0,
                    shots: 0,
                    faceoffs_won: 0,
                    faceoffs_lost: 0,
                    saves: 0,
                    penalties: 0,
                    clears_attempted: 0,
                    clears_made: 0
                });
                player.playerstat_id = newStats.playerstat_id;
            }
            else {
                player.playerstat_id = stats.playerstat_id;
            }
        });
        game.hometeam_id = homeTeam;
        game.awayteam_id = awayTeam;
        await patchGame(game);
    }

    const handleHomePlayerSelect = (event) => {
        
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
                    <label for="homePlayerSelect">Player {i}:</label>
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
                    <label for="homePlayerSelect">Player {i}:</label>
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