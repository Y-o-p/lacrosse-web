<script lang="ts">
    import Modal from './scorebookModal.svelte';
    import { onMount, onDestroy } from 'svelte';

    import type { PageServerData } from "./$types";
    export let data: PageServerData;    // Locals {props.homePlayers & props.coach}

    // ROSTER DATA
    let home_players_roster = data.props.homePlayers; // Set Home Roster
    let away_players_roster = data.props.awayPlayers; // Default away players

    let penaltyTimes = ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"];

    // Update player_stats table to include new row for each 
    // in both rosters

    let faceoffModal = false;
    // Home Modal Delcatations
    let home_shotModal = false;
    let home_turnoverModal = false;
    let home_clearModal = false;
    let home_penaltyModal = false;
    let home_subModal = false;
    let home_groundBallModal = false;
    let home_timeoutModal = false;


    // Away Modal Delcatations
    let away_shotModal = false;
    let away_turnoverModal = false;
    let away_clearModal = false;
    let away_penaltyModal = false;
    let away_subModal = false;
    let away_groundBallModal = false;
    let away_timeoutModal = false;

    // Empty strings for select *options*
    let offensivePlayerSelected = '';
    let offensivePlayerSelected_secondary = '';
    let defensivePlayerSelected = '';
    let penaltyTime = '';

    

    let quarterLength = 15;
    let currentTime = 0;
    let interval;

    const startClock = () => {
        interval = setInterval(() => {
            currentTime++;
        }, 1000);
    };

    onMount(() => {
        startClock();
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    let selectedPlayer = ''; 
    const handleSelection = (event) => {
        selectedPlayer = event.target.value;
    };


</script>

<main>
    <div>
        <h2>{formatTime(currentTime)}</h2>
    
        <div>
            <h1>Home Team</h1>
            <button on:click={() => (home_shotModal = true)}>Shot</button>
            <button on:click={() => (home_turnoverModal = true)}>Turnover Made</button>
            <button on:click={() => (home_clearModal = true)}>Clear Attempted</button>
            <button on:click={() => (home_penaltyModal = true)}>Penalty</button>
            
            <button on:click={() => (home_groundBallModal = true)}>Ground Ball</button>
            <button on:click={() => (home_subModal = true)}>Sub</button>
            <button on:click={() => (home_timeoutModal = true)}>Timeout</button>
        </div>

        <div>
            <h1>Score</h1>
            <h3>0 - 0</h3>
            <button on:click={() => (faceoffModal = true)}>Faceoff</button>
        </div>
    
        <div>
            <h1>Away Team</h1>
            <button on:click={() => (away_shotModal = true)}>Shot</button>
            <button on:click={() => (away_turnoverModal = true)}>Turnover Made</button>
            <button on:click={() => (away_clearModal = true)}>Clear Attempted</button>
            <button on:click={() => (away_penaltyModal = true)}>Penalty</button>
            
            <button on:click={() => (away_groundBallModal = true)}>Ground Ball</button>
            <button on:click={() => (away_subModal = true)}>Sub</button>
            <button on:click={() => (away_timeoutModal = true)}>Timeout</button>
        </div>
    
    </div>
</main>

<Modal bind:faceoffModal>
    <h1 slot="header">FACEOFF</h1>

    <form id="faceoffForm" method="POST" action="?/Faceoff">
        <div class="turnover-modal" style="display: table;">
            <label for="homePlayerSelect">Home Player:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection} required>
                <option value="">Offensive Player</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" name="button" value="Home Won">Won</button>
            <hr />
            
            <label for="awayPlayerSelect">Away Player:</label>
            <select bind:value={defensivePlayerSelected} on:change={handleSelection} required>
                <option value="">Defensive Player</option>
                {#each away_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" name="button" value="Away Won">Won</button>
            
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
            <input type="hidden" name="defensivePlayer" value={defensivePlayerSelected}>
        </div>
    </form>
</Modal>

<!-- HOME SHOT MODAL -->
<Modal bind:home_shotModal>
    <h1 slot="header">HOME TEAM SHOT ATTEMPT</h1>

    <form id="homeShotForm" method="POST" action="?/ShotAttempt">
  
        <div class="shot-modal" style="display: table;">
            <label for="homeShooter">Shot by:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection} required>
                <option value="">Select Player</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <label for="homeAssist">Assisted By:</label>
            <select bind:value={offensivePlayerSelected_secondary} on:change={handleSelection}>
                <option value="">Select Assist</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <hr />

            <button type="submit" name="button" value="Shot Made">Shot Made</button>
            <button type="submit" name="button" value="Shot Missed/Wide">Shot Missed/Wide</button>
            <hr />

            <label for="AwaySavee">Saved By:</label>
            <select bind:value={defensivePlayerSelected} on:change={handleSelection}>
                <option value="">Select Savee</option>
                {#each away_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <!-- If savee selected, show Shot Saved button
                prevents button be pressed without a savee -->
            {#if defensivePlayerSelected != ''}
                <button type="submit" name="button" value="Shot Saved">Shot Saved</button>
            {/if}
            
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
            <input type="hidden" name="offensivePlayerSecondary" value={offensivePlayerSelected_secondary}>
            <input type="hidden" name="defensivePlayer" value={defensivePlayerSelected}>
        </div>
    </form>
</Modal>

<Modal bind:home_turnoverModal>
    <h1 slot="header">HOME TEAM TURNOVER</h1>

    <form id="homeTurnoverForm" method="POST" action="?/Turnover">
        <div class="turnover-modal" style="display: table;">
            <label for="playerSelect">Made by:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection} required>
                <option value="">Offensive Player</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            
            <label for="awayPlayerSelect">Caused By:</label>
            <select bind:value={defensivePlayerSelected} on:change={handleSelection}>
                <option value="">Defensive Player</option>
                {#each away_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" name="button" value="Complete Turnover">Complete Turnover</button>
            
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
            <input type="hidden" name="defensivePlayer" value={defensivePlayerSelected}>
        </div>
    </form>
</Modal>

<Modal bind:home_clearModal>
    <h1 slot="header">HOME TEAM TURNOVER</h1>

    <form id="homeClearForm" method="POST" action="?/Clear">
        <div class="clear-modal" style="display: table;">
            <label for="playerSelect">Clear by:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection}>
                <option value="">Offensive Player</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            <button type="submit" name="button" value="Unsuccessful Clear">Unsuccessful</button>
            <button type="submit" name="button" value="Successful Clear">Successful</button>
            
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
        </div>
    </form>
</Modal>

<Modal bind:home_penaltyModal>
    <h1 slot="header">HOME TEAM PENALTY</h1>

    <form id="homePenaltyForm" method="POST" action="?/Penalty">
        <div class="penalty-modal" style="display: table;">
            <label for="playerSelect">Penalty by:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection} required>
                <option value="">Offensive Player</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            <label for="penaltyDuration">Duration:</label>
            <select bind:value={penaltyTime} on:change={handleSelection} required>
                <option value="">Offensive Player</option>
                {#each penaltyTimes as time}
                    <option value={time}>{time}</option>
                {/each}
            </select>

            <button type="submit" name="button" value="Submit">Submit</button>

            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
            <input type="hidden" name="penaltyTime" value={penaltyTime}>
        </div>
    </form>
</Modal>


<Modal bind:home_groundBallModal>
    <h1 slot="header">GROUNDBALL RECOVERED</h1>

    <form id="groundballForm" method="POST" action="?/Faceoff">
        <div class="turnover-modal" style="display: table;">
            <label for="homePlayerSelect">Home Player:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection} required>
                <option value="">Offensive Player</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" name="button" value="submit">Submit</button>
            <hr />
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
            <input type="hidden" name="defensivePlayer" value={defensivePlayerSelected}>
        </div>
    </form>
</Modal>





<!-- AWAY SHOT MODAL -->
<Modal bind:away_shotModal>
    <h1 slot="header">AWAY TEAM SHOT ATTEMPT</h1>

    <form id="awayShotForm" method="POST" action="?/ShotAttempt">
        <div class="shot-modal" style="display: table;">
            <label for="awayShooter">Shot by:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection} required>
                <option value="">Select Player</option>
                {#each away_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <label for="awayAssist">Assisted By:</label>
            <select bind:value={offensivePlayerSelected_secondary} on:change={handleSelection}>
                <option value="">Select Assist</option>
                {#each away_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            
            <hr />
            <button type="submit" name="button" value="Shot Made">Shot Made</button>
            <button type="submit" name="button" value="Shot Missed/Wide">Shot Missed/Wide</button>

            <hr />
            <label for="AwaySavee">Saved By:</label>
            <select bind:value={defensivePlayerSelected} on:change={handleSelection}>
                <option value="">Select Savee</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>

            <!-- If savee selected, show Shot Saved button
                prevents button be pressed without a savee -->
            {#if defensivePlayerSelected != ''}
                <button type="submit" name="button" value="Shot Saved">Shot Saved</button>
            {/if}
            
            
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
            <input type="hidden" name="defensivePlayer" value={defensivePlayerSelected}>
            <input type="hidden" name="offensivePlayerSecondary" value={offensivePlayerSelected_secondary}>
        </div>
    </form>
</Modal>

<Modal bind:away_turnoverModal>
    <h1 slot="header">AWAY TEAM TURNOVER</h1>

    <form id="awayTurnoverForm" method="POST" action="?/Turnover">
        <div class="turnover-modal" style="display: table;">
            <label for="playerSelect">Made by:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection}>
                <option value="">Offensive Player</option>
                {#each away_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            
            <label for="awayPlayerSelect">Caused By:</label>
            <select bind:value={defensivePlayerSelected} on:change={handleSelection}>
                <option value="">Defensive Player</option>
                {#each home_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" name="button" value="Complete Turnover">Complete Turnover</button>
            
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
            <input type="hidden" name="defensivePlayer" value={defensivePlayerSelected}>
        </div>
    </form>
</Modal>

<Modal bind:away_clearModal>
    <h1 slot="header">AWAY TEAM CLEAR</h1>

    <form id="homeClearForm" method="POST" action="?/Clear">
        <div class="clear-modal" style="display: table;">
            <label for="playerSelect">Clear by:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection}>
                <option value="">Offensive Player</option>
                {#each away_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            <button type="submit" name="button" value="Unsuccessful Clear">Unsuccessful</button>
            <button type="submit" name="button" value="Successful Clear">Successful</button>
            
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
        </div>
    </form>
</Modal>

<Modal bind:away_groundBallModal>
    <h1 slot="header">GROUNDBALL RECOVERED</h1>

    <form id="groundballForm" method="POST" action="?/Faceoff">
        <div class="turnover-modal" style="display: table;">
            <label for="homePlayerSelect">Home Player:</label>
            <select bind:value={offensivePlayerSelected} on:change={handleSelection} required>
                <option value="">Offensive Player</option>
                {#each away_players_roster as player}
                    <option value={player.player_id}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" name="button" value="submit">Submit</button>
            <hr />
            <input type="hidden" name="offensivePlayer" value={offensivePlayerSelected}>
            <input type="hidden" name="defensivePlayer" value={defensivePlayerSelected}>
        </div>
    </form>
</Modal>