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




    let home_p1 = '';
    let home_p2 = '';
    let home_p3 = '';
    let home_p4 = '';
    let home_p5 = '';
    let home_p6 = '';
    let home_p7 = '';
    let home_p8 = '';
    let home_p9 = '';
    let home_p10 = '';

    let away_p1 = '';
    let away_p2 = '';
    let away_p3 = '';
    let away_p4 = '';
    let away_p5 = '';
    let away_p6 = '';
    let away_p7 = '';
    let away_p8 = '';
    let away_p9 = '';
    let away_p10 = '';

    const handleHomePlayerSelect = (event) => {
        if (event.target.id == "home_p1") {
            home_p1 = event.target.value;
        }
        else if (event.target.id == "home_p2") {
            home_p2 = event.target.value;
        }
        else if (event.target.id == "home_p3") {
            home_p3 = event.target.value;
        }
        else if (event.target.id == "home_p4") {
            home_p4 = event.target.value;
        }
        else if (event.target.id == "home_p5") {
            home_p5 = event.target.value;
        }
        else if (event.target.id == "home_p6") {
            home_p6 = event.target.value;
        }
        else if (event.target.id == "home_p7") {
            home_p7 = event.target.value;
        }
        else if (event.target.id == "home_p8") {
            home_p8 = event.target.value;
        }
        else if (event.target.id == "home_p9") {
            home_p9 = event.target.value;
        }
        else if (event.target.id == "home_p10") {
            home_p10 = event.target.value;
        }

    }

    const handleAwayPlayerSelect = (event) => {
        if (event.target.id == "away_p1") {
            away_p1 = event.target.value;
        }
        else if (event.target.id == "away_p2") {
            away_p2 = event.target.value;
        }
        else if (event.target.id == "away_p3") {
            away_p3 = event.target.value;
        }
        else if (event.target.id == "away_p4") {
            away_p4 = event.target.value;
        }
        else if (event.target.id == "away_p5") {
            away_p5 = event.target.value;
        }
        else if (event.target.id == "away_p6") {
            away_p6 = event.target.value;
        }
        else if (event.target.id == "away_p7") {
            away_p7 = event.target.value;
        }
        else if (event.target.id == "away_p8") {
            away_p8 = event.target.value;
        }
        else if (event.target.id == "away_p9") {
            away_p9 = event.target.value;
        }
        else if (event.target.id == "away_p10") {
            away_p10 = event.target.value;
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
            <select bind:value={home_p1} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP2Select">Player 2:</label>
            <select bind:value={home_p2} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>

            <div> <label for="homeP3Select">Player 3:</label>
            <select bind:value={home_p3} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP4Select">Player 4:</label>
            <select bind:value={home_p4} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>

            <div><label for="homeP5Select">Player 5:</label>
            <select bind:value={home_p5} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP6Select">Player 6:</label>
            <select bind:value={home_p6} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>

            <div><label for="homeP7Select">Player 7:</label>
            <select bind:value={home_p7} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP8Select">Player 8:</label>
            <select bind:value={home_p8} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select></div>

            <div><label for="homeP9Select">Player 9:</label>
            <select bind:value={home_p9} on:change={handleHomePlayerSelect} required>
                <option value="">Select Player</option>
                {#each homeTeam_players as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <label for="homeP10Select">Player 10:</label>
            <select bind:value={home_p10} on:change={handleHomePlayerSelect} required>
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
        <select bind:value={away_p1} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP2Select">Player 2:</label>
        <select bind:value={away_p2} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>

        <div> <label for="awayP3Select">Player 3:</label>
        <select bind:value={away_p3} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP4Select">Player 4:</label>
        <select bind:value={away_p4} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>

        <div><label for="awayP5Select">Player 5:</label>
        <select bind:value={away_p5} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP6Select">Player 6:</label>
        <select bind:value={away_p6} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>

        <div><label for="awayP7Select">Player 7:</label>
        <select bind:value={away_p7} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP8Select">Player 8:</label>
        <select bind:value={away_p8} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select></div>

        <div><label for="awayP9Select">Player 9:</label>
        <select bind:value={away_p9} on:change={handleAwayPlayerSelect} required>
            <option value="">Select Player</option>
            {#each awayTeam_players as player}
                <option value={player.player_id}>{player.last_name}</option>
            {/each}
        </select>

        <label for="awayP10Select">Player 10:</label>
        <select bind:value={away_p10} on:change={handleAwayPlayerSelect} required>
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
    <input type="hidden" name="home_p1" value={home_p1}>
    <input type="hidden" name="home_p2" value={home_p2}>
    <input type="hidden" name="home_p3" value={home_p3}>
    <input type="hidden" name="home_p4" value={home_p4}>
    <input type="hidden" name="home_p5" value={home_p5}>
    <input type="hidden" name="home_p6" value={home_p6}>
    <input type="hidden" name="home_p7" value={home_p7}>
    <input type="hidden" name="home_p8" value={home_p8}>
    <input type="hidden" name="home_p9" value={home_p9}>
    <input type="hidden" name="home_p10" value={home_p10}>

    <input type="hidden" name="awayTeamId" value={selectedAwayTeam}>
    <input type="hidden" name="away_p1" value={away_p1}>
    <input type="hidden" name="away_p2" value={away_p2}>
    <input type="hidden" name="away_p3" value={away_p3}>
    <input type="hidden" name="away_p4" value={away_p4}>
    <input type="hidden" name="away_p5" value={away_p5}>
    <input type="hidden" name="away_p6" value={away_p6}>
    <input type="hidden" name="away_p7" value={away_p7}>
    <input type="hidden" name="away_p8" value={away_p8}>
    <input type="hidden" name="away_p9" value={away_p9}>
    <input type="hidden" name="away_p10" value={away_p10}>
</form>

