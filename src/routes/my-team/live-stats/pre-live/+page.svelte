<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data: PageServerData;

    // ROSTER DATA
    let allPlayers = data.props.allPlayers;     // allPlayer[0][0] -> team_id 1, player_id 1
    

    let homeTeam_players = [];
    let awayTeam_players = [];


    // Team Names
    let teamNames  = data.props.teamNames;

    let quarterLength = ''; // Initialize quarter length variable
    let homeTeam = 'Home Team'; // Placeholder for home team data
    let awayTeam = 'Away Team'; // Placeholder for away team data

    // Function to handle button click for selecting home team
    function selectHomeTeam() {

        homeTeam = 'Selected Home Team';
    }

    // Function to handle button click for selecting away team
    function selectAwayTeam() {
        awayTeam = 'Selected Away Team';
    }

    let selectedHomeTeam;
    const handleHomeTeamSelect = (event) => {
        selectedHomeTeam = event.target.value;
        homeTeam_players = allPlayers[selectedHomeTeam - 1];
        
    };

    let selectedAwayTeam;
    const handleAwayTeamSelect = (event) => {
        selectedAwayTeam = event.target.value;
        awayTeam_players = allPlayers[selectedAwayTeam - 1];
    };

    let homeTeam_playerIds = ['', '', '', '', '', '', '', '', '', ''];
    let awayTeam_playerIds = ['', '', '', '', '', '', '', '', '', ''];


    const handleHomePlayerSelect = (event) => {
        if (event.target.id == "home_p1") {
            homeTeam_playerIds[0] = event.target.value;
        }
        else if (event.target.id == "home_p2") {
            homeTeam_playerIds[1] = event.target.value;
        }
        else if (event.target.id == "home_p3") {
            homeTeam_playerIds[2] = event.target.value;
        }
        else if (event.target.id == "home_p4") {
            homeTeam_playerIds[3] = event.target.value;
        }
        else if (event.target.id == "home_p5") {
            homeTeam_playerIds[4] = event.target.value;
        }
        else if (event.target.id == "home_p6") {
            homeTeam_playerIds[5] = event.target.value;
        }
        else if (event.target.id == "home_p7") {
            homeTeam_playerIds[6] = event.target.value;
        }
        else if (event.target.id == "home_p8") {
            homeTeam_playerIds[7] = event.target.value;
        }
        else if (event.target.id == "home_p9") {
            homeTeam_playerIds[8] = event.target.value;
        }
        else if (event.target.id == "home_p10") {
            homeTeam_playerIds[9] = event.target.value;
        }
    }

    const handleAwayPlayerSelect = (event) => {
        if (event.target.id == "away_p1") {
            awayTeam_playerIds[0] = event.target.value;
        }
        else if (event.target.id == "away_p2") {
            awayTeam_playerIds[1] = event.target.value;
        }
        else if (event.target.id == "away_p3") {
            awayTeam_playerIds[2] = event.target.value;
        }
        else if (event.target.id == "away_p4") {
            awayTeam_playerIds[3] = event.target.value;
        }
        else if (event.target.id == "away_p5") {
            awayTeam_playerIds[4] = event.target.value;
        }
        else if (event.target.id == "away_p6") {
            awayTeam_playerIds[5] = event.target.value;
        }
        else if (event.target.id == "away_p7") {
            awayTeam_playerIds[6] = event.target.value;
        }
        else if (event.target.id == "away_p8") {
            awayTeam_playerIds[7] = event.target.value;
        }
        else if (event.target.id == "away_p9") {
            awayTeam_playerIds[8] = event.target.value;
        }
        else if (event.target.id == "away_p10") {
            awayTeam_playerIds[9] = event.target.value;
        }
    }
    
    
</script>

<form id="preLive" method="POST" action="?/StartGame">
    <div>
        <label for="homeTeamSelect">Home Team:</label>
        <select bind:value={selectedHomeTeam} on:change={handleHomeTeamSelect} required>
            <option value="">Select Team</option>
            {#each teamNames as team}
                <option value={team.team_id}>{team.team_name}</option>
            {/each}
        </select>

        
        <div><label for="homeP1Select">Player 1:</label>
            <select bind:value={homeTeam_playerIds[0]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP2Select">Player 2:</label>
            <select bind:value={homeTeam_playerIds[1]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>

            <div> <label for="homeP3Select">Player 3:</label>
            <select bind:value={homeTeam_playerIds[2]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP4Select">Player 4:</label>
            <select bind:value={homeTeam_playerIds[3]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>

            <div><label for="homeP5Select">Player 5:</label>
            <select bind:value={homeTeam_playerIds[4]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP6Select">Player 6:</label>
            <select bind:value={homeTeam_playerIds[5]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>

            <div><label for="homeP7Select">Player 7:</label>
            <select bind:value={homeTeam_playerIds[6]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP8Select">Player 8:</label>
            <select bind:value={homeTeam_playerIds[7]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>

            <div><label for="homeP9Select">Player 9:</label>
            <select bind:value={homeTeam_playerIds[8]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP10Select">Player 10:</label>
            <select bind:value={homeTeam_playerIds[9]} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>
            <hr />
    </div>

    <div>
        <label for="awayTeamSelect">Away Team:</label>
        <select bind:value={selectedAwayTeam} on:change={handleAwayTeamSelect} required>
            <option value="">Select Team</option>
            {#each teamNames as team}
                    <option value={team.team_id}>{team.team_name}</option>
            {/each}
        </select>

        <div>
        <label for="awayP1Select">Player 1:</label>
        <select bind:value={awayTeam_playerIds[0]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP2Select">Player 2:</label>
        <select bind:value={awayTeam_playerIds[1]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>

        <div> <label for="awayP3Select">Player 3:</label>
        <select bind:value={awayTeam_playerIds[2]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP4Select">Player 4:</label>
        <select bind:value={awayTeam_playerIds[3]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>

        <div><label for="awayP5Select">Player 5:</label>
        <select bind:value={awayTeam_playerIds[4]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP6Select">Player 6:</label>
        <select bind:value={awayTeam_playerIds[5]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>

        <div><label for="awayP7Select">Player 7:</label>
        <select bind:value={awayTeam_playerIds[6]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP8Select">Player 8:</label>
        <select bind:value={awayTeam_playerIds[7]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>

        <div><label for="awayP9Select">Player 9:</label>
        <select bind:value={awayTeam_playerIds[8]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP10Select">Player 10:</label>
        <select bind:value={awayTeam_playerIds[9]} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>
        <hr />
    </div>



    <div>
        <label>Quarter length (minutes):</label>
        <input type="text" id="quarterLength" name="quarterLength" bind:value={quarterLength} required>
        <button type="submit">Start Game</button>
    </div>

    <input type="hidden" name="homeTeamId" value={selectedHomeTeam}>
    <input type="hidden" name="awayTeamId" value={selectedAwayTeam}>

    <input type="hidden" name="homePlayersIds" value={homeTeam_playerIds} required>
    <input type="hidden" name="awayPlayersIds" value={awayTeam_playerIds} required>
</form>

