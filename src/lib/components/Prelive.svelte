<script lang="ts">
    import { apiCall, patchGame } from "$lib/api";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let game;
    export let requiredTeam;
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
    let refs = '';
    let timeKeepers = '';
    let scorebookKeepers = '';
    let scoreKeepers = [];
    let timeKeepersArr = [];
    let refsArr = [];
    let gameField = '';
    let homeTeam = null; // Team IDs
    let awayTeam = null; // Team IDs

    let selectedHomeTeam;
    const handleHomeTeamSelect = async (event) => {
        // Populate the home roster array
        try {
            selectedHomeTeam = event.target.value;
            homeRoster = await apiCall<Player>("GET", `/api/players?team_id=${selectedHomeTeam}`);
            homeLineup = homeRoster.slice(0, 10);
        }
        catch {
            homeRoster = [];
            homeLineup = new Array<Player>(10);
        }
    };

    let selectedAwayTeam;
    const handleAwayTeamSelect = async (event) => {
        try {
            selectedAwayTeam = event.target.value;
            awayRoster = await apiCall<Player>("GET", `/api/players?team_id=${selectedAwayTeam}`);
            awayLineup = awayRoster.slice(0, 10);
        }
        catch {
            awayRoster = [];
            awayLineup = new Array<Player>(10);
        }
    };
    async function startGame() {
        homeTeam = selectedHomeTeam;
        awayTeam = selectedAwayTeam;
        scoreKeepers = scorebookKeepers.split(",");
        console.log(scoreKeepers);
        timeKeepersArr = timeKeepers.split(",");
        //console.log(timeKeepersArr);
        refsArr = refs.split(",");
        //console.log(refsArr);
        game.timekeepers = timeKeepersArr;
        game.scorekeepers = scoreKeepers;
        game.refs = refsArr;
        game.game_field = gameField;
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
        <div class="hTeam">
            <label for="homeTeamSelect">Home Team:</label>
            <select bind:value={selectedHomeTeam} on:change={handleHomeTeamSelect} required>
                <option value="" selected disabled hidden>Select Team</option>
                {#each teams.filter(n => n.team_id != selectedAwayTeam) as team}
                    <option value={team.team_id}>{team.team_name}</option>
                {/each}
            </select>
            
            {#each homeLineup as player, i}
                <div>
                    <label for="homePlayerSelect">Player {i+1}:</label>
                    <select bind:value={player} on:change={handleHomePlayerSelect} required>
                        <option value="" selected disabled hidden>Select Player</option>
                        {#each homeRoster.filter(n => n == player || !homeLineup.includes(n)) as playerFromRoster}
                            <option value={playerFromRoster}>#{playerFromRoster.jersey_num} {playerFromRoster.last_name}</option>
                        {/each}
                    </select>
                </div>
            {/each}
        </div>

        <div class="aTeam">
            <label for="awayTeamSelect">Away Team:</label>
            <select bind:value={selectedAwayTeam} on:change={handleAwayTeamSelect} required>
                <option value="" selected disabled hidden>Select Team</option>
                {#each teams.filter(n => n.team_id != selectedHomeTeam) as team}
                        <option value={team.team_id}>{team.team_name}</option>
                {/each}
            </select>
            {#each awayLineup as player, i}
                <div>
                    <label for="homePlayerSelect">Player {i+1}:</label>
                    <select bind:value={player} on:change={handleAwayPlayerSelect} required>
                        <option value="" selected disabled hidden>Select Player</option>
                        {#each awayRoster.filter(n => n == player || !awayLineup.includes(n)) as playerFromRoster}
                            <option value={playerFromRoster}>#{playerFromRoster.jersey_num} {playerFromRoster.last_name}</option>
                        {/each}
                    </select>
                </div>
            {/each}
        </div>

        <hr />

        <div class="info">
            <label>Quarter length (minutes):</label>
            <input type="text" id="quarterLength" name="quarterLength" bind:value={quarterLength} required>

            <label>Game Field: </label>
            <input type="text" id="gameField" name="gameField" bind:value={gameField} required>

            <label>Refs (comma seperated):</label>
            <input type="text" id="refs" name="refs" bind:value={refs} required>
        </div>
        <div class="info">
            <label> Scorebook Keepers (comma seperated):</label>
            <input type="text" id="scorebookKeepers" name="scorebookKeepers" bind:value={scorebookKeepers} required>

            <label>Time Keeper(s) (comma seperated):</label>
            <input type="text" id="timeKeepers" name="timeKeepers" bind:value={timeKeepers} required>
        </div>

        <div class="btnContainer">
            <div class="buttons">
                <button type="submit">Start Game</button>
            </div>
        </div>

        <input type="hidden" name="homeTeamId" value={selectedHomeTeam}>
        <input type="hidden" name="awayTeamId" value={selectedAwayTeam}>
        <input type="hidden" name="homePlayersIds" value={homeLineup} required>
        <input type="hidden" name="awayPlayersIds" value={awayLineup} required>
    </form>
</main>

<style>
    main {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 0px;
        margin-right: 115px;
        width: 100%;
    }

	h1 {
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    .hTeam {
        width: 50%;
    }

    .aTeam {
        width: 49%;
    }

    .hTeam, .aTeam {
        display: inline-block;
        text-align: center;
    }

    .info {
        text-align: center;
        margin-top: 25px;
        margin-bottom: 25px;
    }

    label {
        padding-left: 10px;
    }

    hr {
        background-color: #346856;
        margin-top: 25px;
        margin-bottom: 15px;
        height: 10px;
    }

    .btnContainer {
        padding-top: 10px;
        height: 75px;
        position: relative;
    }

    .buttons {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    button {
        font-size: 35px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        text-shadow: 1px 1px 0 #000, 2px 2px 0 #000;
        font-style: italic;
        color: white;
        background-color: #88c070;
        border: none;
        transform: skew(-12deg);
        padding-right:12px;
        box-shadow: 2px 2px 0 #081820;
    }

    button:hover {
        background-color: #346856;
        cursor: pointer;
    }

</style>